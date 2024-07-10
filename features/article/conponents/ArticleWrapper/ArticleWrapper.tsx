import { Article } from "@/types/cms/article";
import { TocProps } from "@/types/cms/toc";
import ArticleTocTable from "../ArticleTocTable/ArticleTocTable";
import ArticleRichEditor from "../ArticleRichEditor/ArticleRichEditor";
import Image from "next/image";
import dummy from "@/public/dummy.png";
import time from "@/public/time.svg";

type AricleDataProps = {
  articleData: {
    contents: Article;
    richEditor: string;
    toc?: TocProps[]
  }
};

const ArticleWrapper = ({articleData}:AricleDataProps):JSX.Element => {
  const { contents, richEditor, toc } = articleData;
  const options:Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return (
    <article className="mx-[12.5%] md:mx-0" >
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
            {new Date(contents.publishedAt).toLocaleDateString("ja-JP", options)}
          </span>
        </time>
      </div>
      <h1 className="text-4xl md:text-2xl mt-5 leading-snug">{contents.title}</h1>
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
      <ArticleRichEditor richEditor={richEditor} />
    </article>
  );
}

export default ArticleWrapper;