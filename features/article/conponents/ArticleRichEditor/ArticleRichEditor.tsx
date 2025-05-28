import parse, { DOMNode, Element } from 'html-react-parser';
import React from 'react';
import LinkCard from '../LinkCard/LinkCard';

type ArticleRichEditorProps = {
  richEditor: string;
};

const ArticleRichEditor = async ({
  richEditor,
}: ArticleRichEditorProps): Promise<React.ReactElement> => {
  // span.link-card を含む様々なパターンを a.link-card に正規化
  const normalizedHtml = richEditor
    // <p><span class="link-card">URL</span></p> パターンを a.link-card に変換
    .replace(
      /<p[^>]*>\s*<span class="link-card">([^<]+)<\/span>\s*<\/p>/g,
      '<a href="$1" class="link-card">$1</a>'
    )
    // <span class="link-card">URL</span> 単体パターンを a.link-card に変換
    .replace(
      /<span class="link-card">([^<]+)<\/span>/g,
      '<a href="$1" class="link-card">$1</a>'
    )
    // aタグ内の span.link-card パターンを a.link-card に変換
    .replace(
      /<a([^>]*)href="([^"]+)"([^>]*)>\s*<span class="link-card">(.*?)<\/span>\s*<\/a>/g,
      '<a href="$2" class="link-card">$4</a>'
    );
  const options = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === 'a' &&
        domNode.attribs.class?.split(' ').includes('link-card')
      ) {
        const href = domNode.attribs.href;
        return <LinkCard url={href} />;
      }
    },
  };

  return (
    <div className="aricleContents pb-14">{parse(normalizedHtml, options)}</div>
  );
};

export default ArticleRichEditor;
