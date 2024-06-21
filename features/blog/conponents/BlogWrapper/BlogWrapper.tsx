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
            <Link href={`/article/${article.id}`} className="flex flex-col items-center">
              <Image
                src={article.eyecatch?.url ? article.eyecatch.url : dummy}
                alt="アイキャッチ"
                className="rounded-xl object-cover"
                width={1280}
                height={800}
              />
              <span>{article.category}</span>
              <h2 className="text-3xl font-bold">{article.title}</h2>
            </Link>
          </article>
          ))
        }
      </div>

    </div>
  );
}

export default BlogWrapper;