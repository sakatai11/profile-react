import { getBlogArticle, getCategory } from "@/libs/microcms";
import Section from "@/app/components/layouts/common/Section";
import Title from "@/app/components/elements/title/Index";
import { notFound } from "next/navigation";
import * as Blog from "@/features/blog/conponents/Index";

type Props = {
  params: {categoryId: string};
  // sarchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  // 静的ルート生成
  const { categories } = await getCategory();
  return categories.map((category) => ({
      categoryId: category.id,
  }));
}

export default async function CategoryPage(props: Props) {
  const param = props.params.categoryId;
  // 記事一覧の取得
  const { blogs } = await getBlogArticle(param);
    //カテゴリの取得
  const { categories } = await getCategory();

  if ((blogs.length == 0) && (!blogs)) {
    notFound();
  }


  return (
    <Section>
      <Title text="Blog" />
      <Blog.Tab categoryId={ param } categories={ categories } />
      <Blog.BlogWrapper contents={ blogs } />
    </Section>
  );
}