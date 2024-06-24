import { microCMSClient } from "@/libs/microcms";
import { BlogArticles } from "@/types/cms/blog";
import { Category } from "@/types/cms/category";
import Section from "../components/layouts/common/Section";
import Title from "../components/elements/title/Index";
import * as Blog from "@/features/blog/conponents/Index";

export default async function BlogPage() {
  // 記事一覧の取得
  const getBlogArticle = async () => {
    const result = await microCMSClient.getList<BlogArticles>({
      customRequestInit: {
      cache: "force-cache", // キャッシュ内でデータを取得する（SSG）
      },
      endpoint: "blog",
    });

    return {
      blogs: result.contents,
    };
  }

  const { blogs } = await getBlogArticle();

  // カテゴリー一覧の取得
  const getCategory = async () => {
    const result = await microCMSClient.getList<Category>({
      customRequestInit: {
      cache: "force-cache", // キャッシュ内でデータを取得する（SSG）
      },
      endpoint: "category",
    });

    return {
      categories: result.contents,
    };
  }

  const { categories } = await getCategory();

  return (
    <Section>
      <Title text="Blog" />
      <Blog.Tab contents={ categories } />
      <Blog.BlogWrapper contents={ blogs } />
    </Section>
  );
}
