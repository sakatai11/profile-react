import { getBlogArticle, getCategory } from "@/libs/microcms";
import Section from "@/app/components/layouts/common/Section";
import Title from "@/app/components/elements/title/Index";
import * as Blog from "@/features/blog/conponents/Index";
import { notFound } from "next/navigation";
import { PAGE_NAVI } from "@/types/cms/setting";

type Props = {
  params: {
    current?: string;
    categoryId: string;
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

      return [...Array(totalPages)].map((_, i) => ({
        current: (i + 1).toString(), // 数値を文字列に変換
        categoryId: category.id,
      }));
    })
  );

  // console.log(paramsArray.flat());

  // 二次元配列をフラットにする
  return paramsArray.flat();
}

export default async function CurrentCategoryPage({ params }: Props) {
  const currentPage = parseInt(params.current as string, 10);
  // console.log(currentPage);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();

  }  //カテゴリの取得
  const { categories } = await getCategory();

  const { blogs } = await getBlogArticle(params.categoryId,{
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
    offset: PAGE_NAVI.NEW_LIST_LIMIT * (currentPage - 1),
  });

  if (blogs.contents.length === 0) {
    notFound();
  }

  return (
    <Section>
      <Title text="Blog" />
      <Blog.Tab categoryId={ params.categoryId } categories={ categories } />
      <Blog.BlogWrapper contents={ blogs.contents } />
      <Blog.BlogPagination basePath={params.categoryId} currentPage={currentPage} postlimit={PAGE_NAVI.NEW_LIST_LIMIT} totalCount={blogs.totalCount} />
    </Section>
  );
}