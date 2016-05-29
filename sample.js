const toSanitizedMarkdown = require('./src');

const SAMPLE_HTML = `
<p>任意のアプリケーションで表示確認するためのサンプルです。 <br>
自分用ですが、よろしければ置いておきますのでどうぞ。<br>
【2016/03/24】 Markdown Extra, GFM（GitHub Flavored Markdown）の記法を追加しました</p>

<p><a href="https://www.dropbox.com/s/4z6kot27jmikhx5/forapp-markdown-sample.md" title="forapp-markdown-sample.md - Dropbox">forapp-markdown-sample.md - Dropbox</a></p>

<h1>
<span id="見出し1h1" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%971h1"><i class="fa fa-link"></i></a>見出し1（h1）</h1>

<h1>
<span id="見出し1h1-1" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%971h1-1"><i class="fa fa-link"></i></a>見出し1（h1）</h1>

<h2>
<span id="見出し2h2" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%972h2"><i class="fa fa-link"></i></a>見出し2（h2)</h2>

<h2>
<span id="見出し2h2-1" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%972h2-1"><i class="fa fa-link"></i></a>見出し2（h2）</h2>

<h3>
<span id="見出し3" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%973"><i class="fa fa-link"></i></a>見出し3</h3>

<h4>
<span id="見出し4" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%974"><i class="fa fa-link"></i></a>見出し4</h4>

<h5>
<span id="見出し5" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%975"><i class="fa fa-link"></i></a>見出し5</h5>

<h6>
<span id="見出し6" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%976"><i class="fa fa-link"></i></a>見出し6</h6>

<hr>

<p>ここは段落です。♪もーもたろさん もーもたーろさん おっこしーにつっけたーちーびまーるこー</p>

<p>ここは段落です。<br><br>
↑半角スペース2個で強制改行しています。<br><br>
♪もーもたろさん もーもたーろさん おっこしーにつっけたーちーんあーなごー</p>

<ul>
<li>
<strong>強い強調（strong）です。</strong> <strong>これも強い強調です。</strong> <code>&lt;strong&gt;</code>strongタグです。<code>&lt;/strong&gt;</code>
</li>
<li>
<em>強調（em）です。</em> <em>これも強調です。</em> 斜体の<code>&lt;em&gt;</code>タグになります。</li>
<li>
<strong><em>強調斜体です。</em></strong> <strong><em>強調斜体です。</em></strong> <code>&lt;strong&gt;</code>＋<code>&lt;em&gt;</code>タグになります。</li>
</ul>

<blockquote>
<p>引用（Blockquote）です</p>

<blockquote>
<p>引用のネストです</p>
</blockquote>

<p>上に一行空けないとネストのままです</p>
</blockquote>

<p>引用（Blockquote）の中にはMarkdown要素を入れられます</p>

<blockquote>

<h2>
<span id="見出し" class="fragment"></span><a href="#%E8%A6%8B%E5%87%BA%E3%81%97"><i class="fa fa-link"></i></a>見出し</h2>

<ol>
<li>数字リスト</li>
<li>数字リスト</li>
</ol>
</blockquote>

<h2>
<span id="エスケープ文字" class="fragment"></span><a href="#%E3%82%A8%E3%82%B9%E3%82%B1%E3%83%BC%E3%83%97%E6%96%87%E5%AD%97"><i class="fa fa-link"></i></a>エスケープ文字</h2>

<p>*アスタリスクをバックスラッシュでエスケープ*</p>

<p>## 見出しハッシュ文字をエスケープ</p>

<p>HTMLタグをバックスラッシュでエスケープ→（&lt;p&gt;）</p>

<p>HTMLをバッククォートでインラインコード→（<code>&lt;p&gt;</code>）</p>

<h2>
<span id="水平線hr各種" class="fragment"></span><a href="#%E6%B0%B4%E5%B9%B3%E7%B7%9Ahr%E5%90%84%E7%A8%AE"><i class="fa fa-link"></i></a>水平線（<code>&lt;hr&gt;</code>）各種</h2>

<p>アスタリスク3個半角スペース空けて</p>

<hr>

<p>アスタリスク3個以上</p>

<hr>

<p>ハイフン半角スペース空けて</p>

<hr>

<p>続けてハイフン3個以上</p>

<hr>

<h2>
<span id="リスト" class="fragment"></span><a href="#%E3%83%AA%E3%82%B9%E3%83%88"><i class="fa fa-link"></i></a>リスト</h2>

<ul>
<li>ハイフン箇条書きリスト</li>
<li>プラス箇条書きリスト </li>
<li>米印箇条書きリスト

<ul>
<li>二階層め・箇条書きリスト

<ul>
<li>三階層め・箇条書きリスト</li>
<li>四階層め・箇条書きリスト</li>
</ul>
</li>
</ul>
</li>
<li>箇条書きリスト</li>
</ul>

<hr>

<ol>
<li>番号付きリスト

<ol>
<li>二階層め・番号付きリスト1</li>
<li>二階層め・番号付きリスト2</li>
</ol>
</li>
<li>番号付きリスト2

<ol>
<li>二階層め・番号付きリスト1

<ol>
<li>三階層め・番号付きリスト1</li>
<li>三階層め・番号付きリスト2</li>
<li>四階層め・番号付きリスト1</li>
</ol>
</li>
<li>二階層め・番号付きリスト2</li>
</ol>
</li>
<li>番号付きリスト3</li>
</ol>

<p>定義リストタイトル<br>
: 定義リスト要素1<br>
: 定義リスト要素2<br>
: 定義リスト要素3</p>

<h2>
<span id="コードブロック" class="fragment"></span><a href="#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF"><i class="fa fa-link"></i></a>コードブロック</h2>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>バッククォート or 半角チルダ3個でくくります。
###ここにはMarkdown書式は効きません
/* コメント */
testtest // コメント
</pre></div></div>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>&lt;!DOCTYPE html&gt;
&lt;head&gt;
&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
&lt;title&gt;ニョロニョロ囲みhtml&lt;/title&gt;
/* コメント */
</pre></div></div>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>&lt;!DOCTYPE html&gt;
&lt;head&gt;
&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
&lt;title&gt;バッククォート囲みhtml&lt;/title&gt;
</pre></div></div>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>body { display: none; } /* バッククォート囲みcss */
// コメント
</pre></div></div>

<div class="code-frame" data-lang="text"><div class="highlight"><pre>// 先頭に半角スペース4つでcode囲い
&lt;?php if (is_tag()){ $posts = query_posts($query_string . '&amp;showposts=20'); } ?&gt;
</pre></div></div>

<p>バッククォート1個ずつで囲むとインラインのコード（<code>&lt;code&gt;&lt;/code&gt;</code>）です。<code>body { visibility: hidden; }</code></p>

<h2>
<span id="リンク" class="fragment"></span><a href="#%E3%83%AA%E3%83%B3%E3%82%AF"><i class="fa fa-link"></i></a>リンク</h2>

<p>markdownでテキストリンク <a href="http://wired.jp/" title="WIRED.jp">WIRED.jp</a></p>

<p>&lt;カッコ&gt;でくくってリンク <a href="http://wired.jp/" class="autolink">http://wired.jp/</a></p>

<p>定義参照リンクです。SNSには <a href="https://twitter.com/" title="Twitter">Twitter</a> や <a href="https://ja-jp.facebook.com/" title="Facebook">Facebook</a> や <a href="https://plus.google.com/" title="Google+">Google+</a>  などがあります。</p>

<h2>
<span id="画像" class="fragment"></span><a href="#%E7%94%BB%E5%83%8F"><i class="fa fa-link"></i></a>画像</h2>

<p><a href="http://mkb.salchu.net/image/salchu_image02.jpg" target="_blank"><img src="http://mkb.salchu.net/image/salchu_image02.jpg" alt="うきっ！" title="salchu_image02.jpg"></a></p>

<h2>
<span id="table" class="fragment"></span><a href="#table"><i class="fa fa-link"></i></a>table</h2>

<table>
<thead>
<tr>
<th style="text-align: left">Left align</th>
<th style="text-align: right">Right align</th>
<th style="text-align: center">Center align</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left">This</td>
<td style="text-align: right">This</td>
<td style="text-align: center">This</td>
</tr>
<tr>
<td style="text-align: left">column</td>
<td style="text-align: right">column</td>
<td style="text-align: center">column</td>
</tr>
<tr>
<td style="text-align: left">will</td>
<td style="text-align: right">will</td>
<td style="text-align: center">will</td>
</tr>
<tr>
<td style="text-align: left">be</td>
<td style="text-align: right">be</td>
<td style="text-align: center">be</td>
</tr>
<tr>
<td style="text-align: left">left</td>
<td style="text-align: right">right</td>
<td style="text-align: center">center</td>
</tr>
<tr>
<td style="text-align: left">aligned</td>
<td style="text-align: right">aligned</td>
<td style="text-align: center">aligned</td>
</tr>
</tbody>
</table>

<p>（Kobitoのヘルプmdから拝借しました）</p>

<h1>
<span id="gfm" class="fragment"></span><a href="#gfm"><i class="fa fa-link"></i></a>GFM</h1>

<h2>
<span id="リンク-1" class="fragment"></span><a href="#%E3%83%AA%E3%83%B3%E3%82%AF-1"><i class="fa fa-link"></i></a>リンク</h2>

<p>URLそのまま貼り付け <a href="http://wired.jp/" class="autolink">http://wired.jp/</a></p>

<h2>
<span id="段落中の改行" class="fragment"></span><a href="#%E6%AE%B5%E8%90%BD%E4%B8%AD%E3%81%AE%E6%94%B9%E8%A1%8C"><i class="fa fa-link"></i></a>段落中の改行</h2>

<p>ここは段落です。<br>
↑returnで改行しています。<br>
♪もーもたろさん もーもたーろさん おっこしーにつっけたーちー○○ー○○ー</p>

<h2>
<span id="コードブロック-1" class="fragment"></span><a href="#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF-1"><i class="fa fa-link"></i></a>コードブロック</h2>

<p>バッククォートの開始囲みに続けて拡張子でシンタックスハイライト</p>

<div class="code-frame" data-lang="html"><div class="highlight"><pre><span class="cp">&lt;!DOCTYPE html&gt;</span>
<span class="nt">&lt;head&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">http-equiv=</span><span class="s">"X-UA-Compatible"</span> <span class="na">content=</span><span class="s">"IE=edge"</span><span class="nt">&gt;</span>
<span class="nt">&lt;title&gt;</span>バッククォート囲みに拡張子付きhtml<span class="nt">&lt;/title&gt;</span>
/* コメント */
</pre></div></div>

<div class="code-frame" data-lang="css"><div class="highlight"><pre><span class="nt">body</span> <span class="p">{</span> <span class="k">display</span><span class="o">:</span> <span class="k">none</span><span class="p">;</span> <span class="p">}</span> <span class="c">/* コメント */</span>
</pre></div></div>

<div class="code-frame" data-lang="php"><div class="highlight"><pre><span class="cp">&lt;?php</span> <span class="k">if</span> <span class="p">(</span><span class="nx">is_tag</span><span class="p">()){</span> <span class="nv">$posts</span> <span class="o">=</span> <span class="nx">query_posts</span><span class="p">(</span><span class="nv">$query_string</span> <span class="o">.</span> <span class="s1">'&amp;showposts=20'</span><span class="p">);</span> <span class="p">}</span> <span class="cp">?&gt;</span><span class="x"></span>
</pre></div></div>

<h2>
<span id="取り消し線" class="fragment"></span><a href="#%E5%8F%96%E3%82%8A%E6%B6%88%E3%81%97%E7%B7%9A"><i class="fa fa-link"></i></a>取り消し線</h2>

<p><del>取り消し線（GFM記法）</del><br><br>
<s>sタグです。</s></p>

<h2>
<span id="単語中のアンダースコアの無効" class="fragment"></span><a href="#%E5%8D%98%E8%AA%9E%E4%B8%AD%E3%81%AE%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%82%B3%E3%82%A2%E3%81%AE%E7%84%A1%E5%8A%B9"><i class="fa fa-link"></i></a>単語中のアンダースコアの無効</h2>

<p>GitHub_Flavored_Markdown_test_test</p>

<h2>
<span id="tasklist" class="fragment"></span><a href="#tasklist"><i class="fa fa-link"></i></a>tasklist</h2>

<ul>
<li class="task-list-item">
<input type="checkbox" class="task-list-item-checkbox" disabled="">task1</li>
<li class="task-list-item">
<input type="checkbox" class="task-list-item-checkbox" disabled="">task2</li>
<li class="task-list-item">
<input type="checkbox" class="task-list-item-checkbox" checked="" disabled="">completed task</li>
</ul>

<h1>
<span id="参考url" class="fragment"></span><a href="#%E5%8F%82%E8%80%83url"><i class="fa fa-link"></i></a>参考URL</h1>

<ul>
<li><a href="http://daringfireball.net/projects/markdown/syntax.php">Daring Fireball: Markdown Syntax Documentation</a></li>
<li><a href="http://mametanuki.hateblo.jp/entry/2012/09/22/MarkdownList#Links">はてなブログで「Markdown記法一覧」を書いてみるテスト - そっと、はてなブログ</a></li>
<li><a href="https://gist.github.com/wate/7072365">Markdownで行こう！ · GitHub</a></li>
</ul>
`;

toSanitizedMarkdown(SAMPLE_HTML)
  .then(markdown => console.log(markdown))
  .catch(err => console.error(err));
