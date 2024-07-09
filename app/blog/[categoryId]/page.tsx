import { getBlogArticle, getCategory } from "@/libs/microcms";
import { PAGE_NAVI } from "@/types/cms/setting";
import Section from "@/app/components/layouts/common/Section";
import Title from "@/app/components/elements/title/Index";
// import Button from "@/app/components/elements/button/Index";
import { notFound } from "next/navigation";
import * as Blog from "@/features/blog/conponents/Index";

type Props = {
  params: {
    categoryId: string;
    current?: string;
  };
  // sarchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  // 静的ルート生成
  const { categories } = await getCategory();
  
  return categories.map((category) => ({
      categoryId: category.id,
  }));
}

export default async function CategoryPage({params}: Props) {
  const param = params.categoryId;
  const current = params?.current || "1";

  console.log(current);

  // 記事一覧の取得
  const { blogs } = await getBlogArticle(param,{
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
    offset: (Number(current as string) - 1) * PAGE_NAVI.NEW_LIST_LIMIT,
  });
    //カテゴリの取得
  const { categories } = await getCategory();

  if ((blogs.contents.length == 0) && (!blogs)) {
    notFound();
  }

  const currentPage = Number(current);

  return (
    <Section>
      <Title text="Blog" />
      <Blog.Tab categoryId={ param } categories={ categories } />
      <Blog.BlogWrapper contents={ blogs.contents } />
      {/* <Button currentPage={currentPage} postlimit={PAGE_NAVI.NEW_LIST_LIMIT} totalCount={blogs.totalCount} /> */}
      <Blog.BlogPagination currentPage={currentPage} postlimit={PAGE_NAVI.NEW_LIST_LIMIT} totalCount={blogs.totalCount} />
    </Section>
  );
}