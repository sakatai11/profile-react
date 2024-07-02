import { BlogList } from "@/types/cms/blog";
import Image from "next/image";
import Link from "next/link";
import dummy from "@/public/dummy.png";

type BlogDataProps = {
  contents: BlogList[];
};

const BlogWrapper = ({contents}:BlogDataProps): JSX.Element => {
    // 各記事のカテゴリーをコンソールに出力
      // console.log(contents);

  return (
      <div className="mt-14 grid grid-cols-3 gap-x-[5.5vw] gap-y-[5vw]">
        {
          contents.map((article) => (
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
        }
      </div>
  );
}

export default BlogWrapper;