'use client';
import parse from "html-react-parser";
import { useEffect, useRef } from "react";
// シンタックスハイライト
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

type ArticleRichEditorProps = {
  content: string;
};

const ArticleRichEditor = ({content}:ArticleRichEditorProps):JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // シンタックスハイライト
      const $ = load(content);
      $('pre code').each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass('hljs');
      });
      
      // ファイル名を表示するためのspanタグを生成
      $('div[data-filename]').each((_, elm) => {
        const fileName = $(elm).attr('data-filename');
        console.log('File name:', fileName); // ここでファイル名を確認
        if (fileName) {
          $(elm).prepend(`<span class="filename">${fileName}</span>`);
          }
          });
          
      // 更新されたHTMLを反映
      contentRef.current.innerHTML = $.html();
    }
  }, [content]);

  return (
    <div className="aricleContents" ref={contentRef}>
      {parse(content)}
    </div>
  )
}

export default ArticleRichEditor;