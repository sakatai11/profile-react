import { Article } from "@/types/cms/article";
import { TocProps } from "@/types/cms/toc";
import parse from "html-react-parser";
import ArticleTocTable from "../ArticleTocTable/ArticleTocTable";
import Image from "next/image";
import dummy from "@/public/dummy.png";
import time from "@/public/time.svg";

type AricleDataProps = {
  contents: Article;
  toc?: TocProps[]
};

const ArticleWrapper = ({contents, toc}:AricleDataProps):JSX.Element => {
  
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
      <div className="flex items-center gap-5">
        {
          contents.categories.map((category) => (
            <span key={category.id} className="text-sm">
              {category.category}
            </span>
          ))
        }
        <time className="text-sm block">
          <span className="flex items-center">
            <Image src={time} width={15} height={15} alt="公開日" className="mr-1"/>
            {formattedDate}
          </span>
        </time>
      </div>
      <h1 className="text-4xl mt-5 leading-snug">{contents.title}</h1>
      <div className="mt-8">
        <Image 
          src={contents.eyecatch?.url ? contents.eyecatch?.url : dummy }
          height={contents.eyecatch?.height}
          width={contents.eyecatch?.width}
          alt="アイキャッチ"
          className="rounded-xl object-cover aspect-[16/10]"
        />
      </div>
      {
        toc ? (
          <ArticleTocTable toc={toc} />
        ) : undefined
      }
      <div className="aricleContents">
        {parse(contents.content)}
      </div>

    </article>
  );
}

export default ArticleWrapper;