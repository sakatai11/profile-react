// SSG
export const dynamic = 'force-static';

import { getBlogArticle, getCategory } from '../../_libs/microcms';
import { PAGE_NAVI } from '@/types/cms/setting';
import MotionWrapper from '@/app/_components/motion/motionWrapper';
import Title from '@/app/_components/elements/title/Index';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import * as Blog from '@/features/blog/conponents/Index';

type Props = {
  params: {
    categoryId: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { category } = await getCategory(params.categoryId);

  return {
    title: category.category,
    description: `${category.category}の記事一覧です。`,
  };
};

export async function generateStaticParams() {
  // 静的ルート生成
  const { categories } = await getCategory();

  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const currentPage = 1; // 最初のページ

  // 記事一覧の取得
  const { blogs } = await getBlogArticle(params.categoryId, {
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
    offset: PAGE_NAVI.NEW_LIST_LIMIT * (currentPage - 1),
  });

  //カテゴリの取得
  const { categories } = await getCategory();

  if (blogs.contents.length === 0 && !blogs) {
    notFound();
  }

  return (
    <>
      <Title text="Blog" />
      <Blog.Tab categoryId={params.categoryId} categories={categories} />
      {!blogs.contents.length && (
        <p className="mt-14 text-center">記事がありません</p>
      )}
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
