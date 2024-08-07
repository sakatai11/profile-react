import { BlogList } from '@/types/cms/blog';
import LinkButton from '@/app/_components/elements/button/Index';
import MicroCmsImage from '@/features/components/MicroCmsImage/MicroCmsImage';
import Link from 'next/link';

type BlogDataProps = {
  contents: BlogList[];
  param: string;
};

const ArticleCategory = ({ contents, param }: BlogDataProps): JSX.Element => {
  // 現在のページのIDと一致するコンテンツを除外
  const filteredContents = contents.filter((content) => content.id !== param);

  return (
    <section>
      <div className="mx-[12.5%] md:mx-0">
        <div className="border-t-2 border-[#CED1D9] pt-14">
          <h2 className="relative pl-6 text-[1.625rem] font-medium before:absolute before:left-0 before:top-0 before:block before:h-full before:w-1 before:rounded before:bg-skyblue before:content-[''] md:text-2xl">
            関連記事
          </h2>
          <div className="mt-9 grid grid-cols-3 gap-x-[5.5vw] md:grid-cols-1 md:gap-y-16">
            {filteredContents.length > 0
              ? filteredContents.slice(0, 3).map((article) => (
                  <article className="flex flex-col" key={article.id}>
                    <Link
                      href={`/article/${article.id}`}
                      className="hover:text-skyblue hover:opacity-80"
                    >
                      <div className="relative">
                        <MicroCmsImage
                          src={
                            article.eyecatch?.url ? article.eyecatch.url : ''
                          }
                          width={article.eyecatch?.width || 1280}
                          height={article.eyecatch?.height || 800}
                          alt="アイキャッチ"
                          className="aspect-[16/10] rounded-xl object-cover shadow"
                        />
                        {article.categories.map((category) => (
                          <span
                            className="absolute bottom-0 left-0 mb-2.5 ml-2.5 inline-block rounded-md bg-white px-2 py-1.5 text-sm md:text-base"
                            key={category.id}
                          >
                            {category.category}
                          </span>
                        ))}
                      </div>
                      <p className="m-2.5 text-base font-semibold md:text-2xl md:font-medium">
                        {article.title}
                      </p>
                    </Link>
                  </article>
                ))
              : null}
          </div>
        </div>
        <LinkButton text="記事一覧を見る" />
      </div>
    </section>
  );
};

export default ArticleCategory;
