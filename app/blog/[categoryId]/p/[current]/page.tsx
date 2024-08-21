// SSG
export const dynamic = 'force-static';

import { getBlogArticle, getCategory } from '../../../../_libs/microcms';
import MotionWrapper from '@/app/_components/motion/motionWrapper';
import Title from '@/app/_components/elements/title/Index';
import * as Blog from '@/features/blog/conponents/Index';
import { notFound } from 'next/navigation';
import { PAGE_NAVI } from '@/types/cms/setting';
import type { Metadata } from 'next';

type Props = {
  params: {
    current?: string;
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
  const { categories } = await getCategory();

  const paramsArray = await Promise.all(
    categories.map(async (category) => {
      const { blogs } = await getBlogArticle(category.id, {
        limit: PAGE_NAVI.NEW_LIST_LIMIT,
      });

      const totalPages = Math.ceil(blogs.totalCount / PAGE_NAVI.NEW_LIST_LIMIT);

      return [...Array(totalPages)]
        .map((_, i) => {
          const currentPage = (i + 1).toString();
          // totalPagesが2以降存在する場合、各カテゴリの最初のページを除外
          if (currentPage === '1' && totalPages > 1) {
            return null;
          }
          return {
            current: currentPage,
            categoryId: category.id,
          };
        })
        .filter(Boolean); // null値を削除
    }),
  );

  // 二次元配列をフラットにする
  return paramsArray.flat();
}

export default async function CurrentCategoryPage({ params }: Props) {
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
