import { Article } from "@/types/cms/article";

type AricleDataProps = {
  contents: Article;
};

const ArticleWrapper = ({contents}:AricleDataProps):JSX.Element => {
  
  // ISO 8601 形式の日付を Date オブジェクトに変換
  const date = new Date(contents.publishedAt);

  // 日付を 'yyyy.MM.dd' 形式にフォーマット
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date).replace(/\//g, '.');

  return (
    <article className="mx-[12.5%]">
      <time>
        {formattedDate}
      </time>
    </article>
  );
}

export default ArticleWrapper;