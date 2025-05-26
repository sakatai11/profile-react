import parse, { DOMNode, Element } from 'html-react-parser';
import React from 'react';
import LinkCard from '../LinkCard/LinkCard';

type ArticleRichEditorProps = {
  richEditor: string;
};

const ArticleRichEditor = async ({
  richEditor,
}: ArticleRichEditorProps): Promise<React.ReactElement> => {
  // span 要素内の link-card を持つパターンをアンカー要素へ正規化
  const normalizedHtml = richEditor.replace(
    /<a([^>]*)href="([^"]+)"([^>]*)>\s*<span class="link-card">(.*?)<\/span>\s*<\/a>/g,
    '<a href="$2" class="link-card">$4</a>',
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
