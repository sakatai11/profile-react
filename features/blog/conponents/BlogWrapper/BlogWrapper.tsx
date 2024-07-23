import { BlogList } from '@/types/cms/blog';
import MicroCmsImage from '@/features/components/MicroCmsImage/MicroCmsImage';
import Link from 'next/link';

type BlogDataProps = {
  contents: BlogList[];
};

const BlogWrapper = ({ contents }: BlogDataProps): JSX.Element => {
  // 各記事のカテゴリーをコンソールに出力
  // console.log(contents);

  return (
    <div className="mt-14 grid grid-cols-3 md:grid-cols-1 gap-x-[5.5vw] gap-y-[5vw] md:gap-y-16">
      {contents.length > 0
        ? contents.map((article) => (
            <article className="flex flex-col" key={article.id}>
              <Link
                href={`/article/${article.id}`}
                className="hover:text-skyblue hover:opacity-80"
              >
                <div className="relative">
                  <MicroCmsImage
                    src={article.eyecatch?.url ? article.eyecatch.url : ''}
                    width={article.eyecatch?.width || 1280}
                    height={article.eyecatch?.height || 800}
                    alt="アイキャッチ"
                    className="rounded-xl object-cover aspect-[16/10] shadow"
                  />
                  {article.categories.map((category) => (
                    <span
                      className="absolute bottom-0 left-0 inline-block bg-white mb-2.5 ml-2.5 px-2 py-1.5 rounded-md"
                      key={category.id}
                    >
                      {category.category}
                    </span>
                  ))}
                </div>
                <p className="text-2xl font-medium m-2.5">{article.title}</p>
              </Link>
            </article>
          ))
        : null}
    </div>
  );
};

export default BlogWrapper;
