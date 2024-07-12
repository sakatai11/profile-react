import { BlogList } from "@/types/cms/blog";
import LinkButton from "@/app/components/elements/button/Index";
import MicroCmsImage from "@/features/components/MicroCmsImage/MicroCmsImage";
import Link from "next/link";

type BlogDataProps = {
  contents: BlogList[];
  param: string;
}

const ArticleCategory = ({ contents,param }:BlogDataProps):JSX.Element => {
  // 現在のページのIDと一致するコンテンツを除外
  const filteredContents = contents.filter(content => content.id !== param);

  return (
    <section>
      <div className="mx-[12.5%] md:mx-0">
        <div className="pt-14 border-t-2 border-[#CED1D9]">
          <h2 className="relative text-[1.625rem] md:text-2xl pl-6 font-medium before:absolute before:content-[''] before:w-1 before:h-full before:top-0 before:left-0 before:bg-skyblue before:block before:rounded">関連記事</h2>
          <div className="mt-9 grid grid-cols-3 md:grid-cols-1 md:gap-y-16 gap-x-[5.5vw]">
            {
              filteredContents.length > 0 ? (
                filteredContents.slice(0, 3).map((article) => (
                  <article className="flex flex-col" key={article.id}>
                  <Link href={`/article/${article.id}`} className="hover:text-skyblue hover:opacity-80">
                    <div className="relative">
                      <MicroCmsImage 
                        src={article.eyecatch?.url ? article.eyecatch.url : ''}
                        width={article.eyecatch?.width || 1280}
                        height={article.eyecatch?.height || 800}
                        alt="アイキャッチ"
                        className="rounded-xl object-cover aspect-[16/10] shadow"
                      />
                      {
                        article.categories.map((category) => (
                          <span className="absolute text-sm md:text-base bottom-0 left-0 inline-block bg-white mb-2.5 ml-2.5 px-2 py-1.5 rounded-md" key={category.id}>
                            {category.category}
                          </span>
                        ))
                      }
                    </div>
                    <p className="text-base md:text-2xl font-semibold md:font-medium m-2.5">{article.title}</p>
                  </Link>
                </article>
                ))
              ) : (
                null
              )
            }
          </div>
        </div>
      <LinkButton text="記事一覧を見る" />
      </div>
    </section>
  );
}

export default ArticleCategory;