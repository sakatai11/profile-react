import { microCMSClient } from "@/libs/microcms";
import { BlogArticles } from "@/types/cms/blog";
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
      props: result.contents,
    };
  }

  
  const { props } = await getBlogArticle();
  console.log(props);

  return (
    <Section>
      <Title text="Blog" />
      <Blog.BlogWrapper contents={ props } />
    </Section>
  );
}
