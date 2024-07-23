import parse from 'html-react-parser';

type ArticleRichEditorProps = {
  richEditor: string;
};

const ArticleRichEditor = ({
  richEditor,
}: ArticleRichEditorProps): JSX.Element => {
  return <div className="aricleContents pb-14">{parse(richEditor)}</div>;
};

export default ArticleRichEditor;
