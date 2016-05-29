const jsdom = require('jsdom');
const toMarkdown = require('to-markdown');

const AVAILABLE_NODE_NAMES = [
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'BR',
  'HR',
  'EM',
  'I',
  'STRONG',
  'B',
  'CODE',
  'A',
  'IMG',
  'PRE',
  'CODE',
  'BLOCKQUOTE',
  'UL',
  'OL',
  'LI',
];

var HIGHLIGHT_REGEX = /highlight highlight-(\S+)/

const toSanitizedMarkdown = html => {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (err, window) => {
      if (err) return reject(err);

      const sanitize = node => {
        if (!node.hasChildNodes()) {
          if (node.nodeName === '#text' && node.textContent.trim() === '') {
            return window.document.createDocumentFragment();
          } else if (AVAILABLE_NODE_NAMES.indexOf(node.nodeName) !== -1) {
            return node;
          } else {
            return window.document.createTextNode(node.textContent.trim());
          }
        }

        const children = Array.from(node.childNodes);

        let parent;

        if (node.nodeName === 'DIV' && node.firstChild.nodeName === 'PRE') {
          parent = node.cloneNode();
        } else if (AVAILABLE_NODE_NAMES.indexOf(node.nodeName) !== -1) {
          parent = node.cloneNode();
        } else {
          parent = window.document.createDocumentFragment();
        }

        for (const child of children) {
          parent.appendChild(sanitize(child));
        }

        return parent;
      };

      const sanitized = sanitize(window.document.querySelector('body'));
      const wrapper = window.document.createElement('div');

      wrapper.appendChild(sanitized);

      resolve(toMarkdown(wrapper.innerHTML, {
        gfm: true,
        converters: [
          {
            filter: node => {
              return node.nodeName === 'PRE' &&
                     node.parentNode.nodeName === 'DIV';
            },
            replacement: (content, node) => {
              const matched = node.parentNode.className.match(HIGHLIGHT_REGEX);
              const lang = matched ? matched[1] : '';

              return `\n\n\`\`\`${lang}\n${node.textContent}\n\`\`\`\n\n`;
            },
          },
          {
            filter: node => {
              return node.nodeName === 'DIV' &&
                     node.firstChild.nodeName === 'PRE';
            },
            replacement: content => {
              return '\n\n' + content + '\n\n';
            },
          },
        ],
      }));
    });
  })
};

module.exports = toSanitizedMarkdown;
