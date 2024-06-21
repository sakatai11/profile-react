import { BlogArticles } from "@/types/cms/blog";
import { categoryLinks } from "@/data/category";
import Image from "next/image";
import Link from "next/link";
import dummy from "/public/dummy.png";

type BlogDataProps = {
  contents: BlogArticles[];
}

const BlogWrapper = ({contents}:BlogDataProps): JSX.Element => {
  return (
    <div className="w-full mt-28">
      <div className="flex justify-between items-center mx-[20%]">
        {
          categoryLinks.map(({ name, href }) => (
            <p key={name}>
              <Link href={href}>{name}</Link>
            </p>
          ))
        }
      </div>
      <div className="mt-14 grid grid-cols-3 gap-x-[7.5vw] gap-y-[5vw]">
        {
          contents.map((article) => (
            <article className="flex flex-col" key={article.id}>
            <Link href={`/article/${article.id}`} >
              <div className="relative">
                <Image
                  src={article.eyecatch?.url ? article.eyecatch.url : dummy}
                  alt="アイキャッチ"
                  className="rounded-xl object-cover"
                  width={1280}
                  height={800}
                />
                <span className="absolute bottom-0 left-0 inline-block bg-white mb-2.5 ml-2.5 px-2 py-1.5 rounded-md">{article.category}</span>
              </div>
              <h2 className="text-2xl font-medium mt-2.5 ml-2.5">{article.title}</h2>
            </Link>
          </article>
          ))
        }
      </div>

    </div>
  );
}

export default BlogWrapper;