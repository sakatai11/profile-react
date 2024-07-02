import { getBlogArticle, getBlogArticleDetail } from "@/libs/microcms";
import Section from "@/app/components/layouts/common/Section";
import { createTableOfContents } from "@/libs/utils";
import * as Article from "@/features/article/conponents/Index";
// シンタックスハイライト
// import { load } from 'cheerio';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/hybrid.css';

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

  // console.log([...paths]);

  return  [...paths];
}

export default async function ArticlePage(props: Props) {
  const param = props.params.articleId;
 // 特定の記事の取得
  const { article } = await getBlogArticleDetail(param);

  const toc = createTableOfContents(article.content);
  // console.log(article.toc_visible);
  // console.log(article);
  // console.log(toc);
  const category = article.categories[0].id;
  console.log(category);

  const { blogs } = await getBlogArticle(category)
  console.log(blogs);

  // シンタックスハイライト
  // const $ = load(article.content);
  // $('pre code').each((_, elm) => {
  //     const result = hljs.highlightAuto($(elm).text());
  //     $(elm).html(result.value);
  //     $(elm).addClass('hljs');
  // });
  // article.content = $.html();

  return (
    <Section>
      <Article.ArticleWrapper contents={ article } toc={toc} />
      <Article.ArticleCategory contents={ blogs } param={param} />
    </Section>
  );
}