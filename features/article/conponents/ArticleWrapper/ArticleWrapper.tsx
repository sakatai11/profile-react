import { Article } from '@/types/cms/article';
import { TocProps } from '@/types/cms/toc';
import ArticleTocTable from '../ArticleTocTable/ArticleTocTable';
import ArticleRichEditor from '../ArticleRichEditor/ArticleRichEditor';
import Link from 'next/link';
import Image from 'next/image';
import MicroCmsImage from '@/features/components/MicroCmsImage/MicroCmsImage';
import time from '@/public/time.svg';

type AricleDataProps = {
  articleData: {
    contents: Article;
    richEditor: string;
    toc?: TocProps[];
  };
};

const ArticleWrapper = ({ articleData }: AricleDataProps): JSX.Element => {
  const { contents, richEditor, toc } = articleData;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return (
    <article className="mx-[12.5%] md:mx-0">
      <div className="flex items-center gap-5">
        {contents.categories.map((category) => (
          <Link
            href={`/blog/${category.id}`}
            key={category.id}
            className="text-xs py-1 px-1.5 border-[1px] border-black rounded-md hover:bg-black hover:text-white"
          >
            {category.category}
          </Link>
        ))}
        <time className="text-sm block">
          <span className="flex items-center">
            <Image
              src={time}
              width={15}
              height={15}
              alt="公開日"
              className="mr-1"
              priority
            />
            {new Date(contents.publishedAt).toLocaleDateString(
              'ja-JP',
              options,
            )}
          </span>
        </time>
      </div>
      <h1 className="text-4xl font-medium md:text-2xl mt-5 leading-snug">
        {contents.title}
      </h1>
      <div className="mt-8">
        <MicroCmsImage
          src={contents.eyecatch?.url ? contents.eyecatch.url : ''}
          width={contents.eyecatch?.width || 1280}
          height={contents.eyecatch?.height || 800}
          alt="アイキャッチ"
          className="rounded-xl object-cover aspect-[16/10]"
        />
      </div>
      {toc ? <ArticleTocTable toc={toc} /> : undefined}
      <ArticleRichEditor richEditor={richEditor} />
    </article>
  );
};

export default ArticleWrapper;
