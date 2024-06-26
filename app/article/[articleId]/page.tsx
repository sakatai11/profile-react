import { getBlogArticle, getBlogArticleDetail } from "@/libs/microcms";
import Section from "@/app/components/layouts/common/Section";
import * as Article from "@/features/article/conponents/Index";

type Props = {
  params: {articleId: string};
  // sarchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  // 静的ルート生成
  const { blogs } = await getBlogArticle();
  const paths = blogs.map((article) => {
    return {
      article: article.id,
    };
  });

  console.log([...paths]);

  return  [...paths];
}

export default async function ArticlePage(props: Props) {
  const param = props.params.articleId;

  const { article } = await getBlogArticleDetail(param);

  return (
    <Section>
      <Article.ArticleTop contents={article}  />
      <Article.ArticleWrapper contents={ article } />
    </Section>
  );
}