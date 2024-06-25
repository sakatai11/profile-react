import { getBlogArticle, getCategory } from "@/libs/microcms";
import Section from "@/app/components/layouts/common/Section";
import Title from "@/app/components/elements/title/Index";
import * as Blog from "@/features/blog/conponents/Index";

type Props = {
  params: {categoryId: string};
  // sarchParams: { [key: string]: string | string[] | undefined };
};

export default async function CategoryPage(props: Props) {
  const param = props.params.categoryId;
  // 記事一覧の取得
  const { blogs } = await getBlogArticle(param);

  // カテゴリIDの取得
  const { categories } = await getCategory();

  return (
    <Section>
      <Title text="Blog" />
      <Blog.Tab contents={ categories } categoryId={ param }  />
      <Blog.BlogWrapper contents={ blogs } />
    </Section>
  );
}