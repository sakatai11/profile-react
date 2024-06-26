import { Article } from "@/types/cms/article";

type AricleDataProps = {
  contents: Article;
};

const ArticleWrapper = ({contents}:AricleDataProps):JSX.Element => {
  console.log(contents);

  return (
    <></>
  );
}

export default ArticleWrapper;