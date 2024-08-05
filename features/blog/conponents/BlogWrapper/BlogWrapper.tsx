import { BlogList } from '@/types/cms/blog';
import MicroCmsImage from '@/features/components/MicroCmsImage/MicroCmsImage';
import Link from 'next/link';

type BlogDataProps = {
  contents: BlogList[];
};

const BlogWrapper = ({ contents }: BlogDataProps): JSX.Element => {
  // 各記事のカテゴリーをコンソールに出力

  return (
    <div className="mt-14 grid grid-cols-3 gap-x-[5.5vw] gap-y-[5vw] md:grid-cols-1 md:gap-y-16">
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
                    className="aspect-[16/10] w-screen rounded-xl object-cover shadow"
                  />
                  {article.categories.map((category) => (
                    <span
                      className="absolute bottom-0 left-0 mb-2.5 ml-2.5 inline-block rounded-md bg-white px-2 py-1.5"
                      key={category.id}
                    >
                      {category.category}
                    </span>
                  ))}
                </div>
                <p className="m-2.5 text-2xl font-medium">{article.title}</p>
              </Link>
            </article>
          ))
        : null}
    </div>
  );
};

export default BlogWrapper;
