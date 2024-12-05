import { getBlogArticle, getCategory } from '../../../../_libs/microcms';
import MotionWrapper from '@/app/_components/motion/motionWrapper';
import Title from '@/app/_components/elements/title/Index';
import * as Blog from '@/features/blog/conponents/Index';
import { notFound } from 'next/navigation';
import { PAGE_NAVI } from '@/types/cms/setting';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    current?: string;
    categoryId: string;
  }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const { category } = await getCategory(params.categoryId);

  return {
    title: category.category,
    description: `${category.category}の記事一覧です。`,
  };
};

export default async function CurrentCategoryPage(props: Props) {
  const params = await props.params;
  const currentPage = parseInt(params.current as string, 10);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  } // カテゴリの取得
  const { categories } = await getCategory();

  const { blogs } = await getBlogArticle(params.categoryId, {
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
    offset: PAGE_NAVI.NEW_LIST_LIMIT * (currentPage - 1),
  });

  if (blogs.contents.length === 0) {
    notFound();
  }

  return (
    <>
      <Title text="Blog" />
      <Blog.Tab categoryId={params.categoryId} categories={categories} />
      <MotionWrapper>
        <Blog.BlogWrapper contents={blogs.contents} />
      </MotionWrapper>
      <Blog.BlogPagination
        basePath={params.categoryId}
        currentPage={currentPage}
        postlimit={PAGE_NAVI.NEW_LIST_LIMIT}
        totalCount={blogs.totalCount}
      />
    </>
  );
}
