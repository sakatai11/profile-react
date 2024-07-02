import { BlogList } from "@/types/cms/blog";
import Link from "next/link";
import Image from "next/image";
import dummy from"@/public/dummy.png";

type BlogDataProps = {
  contents: BlogList[];
  param: string;
}

const ArticleCategory = ({ contents,param }:BlogDataProps):JSX.Element => {
  // 現在のページのIDと一致するコンテンツを除外
  const filteredContents = contents.filter(content => content.id !== param);

  return (
    <section  className="mt-14">
      <div className="mx-[12.5%]">
        <div className="pt-14 border-t-2 border-[#CED1D9]">
          <h2 className="relative text-[1.625rem] pl-6 font-medium before:absolute before:content-[''] before:w-1 before:h-full before:top-0 before:left-0 before:bg-skyblue before:block before:rounded">関連記事</h2>
          <div className="mt-9 grid grid-cols-3 gap-x-[5.5vw] ">
            {
              filteredContents.length > 0 ? (
                filteredContents.map((article) => (
                  <article className="flex flex-col" key={article.id}>
                  <Link href={`/article/${article.id}`} >
                    <div className="relative">
                      <Image
                        src={article.eyecatch?.url ? article.eyecatch.url : dummy}
                        alt="アイキャッチ"
                        className="rounded-xl object-cover aspect-[16/10]"
                        width={1280}
                        height={800}
                      />
                      {
                        article.categories.map((category) => (
                          <span className="absolute bottom-0 left-0 inline-block bg-white mb-2.5 ml-2.5 px-2 py-1.5 rounded-md" key={category.id}>
                            {category.category}
                          </span>
                        ))
                      }
                    </div>
                    <p className="text-2xl font-medium mt-2.5 ml-2.5">{article.title}</p>
                  </Link>
                </article>
                ))
              ) : (
                <p>記事がありません</p>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleCategory;