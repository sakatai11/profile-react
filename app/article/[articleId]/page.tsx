import { getBlogArticle, getBlogArticleDetail } from "@/libs/microcms";
import Section from "@/app/components/layouts/common/Section";
import { createTableOfContents } from "@/libs/utils";
import { notFound } from "next/navigation";
import * as Article from "@/features/article/conponents/Index";
// シンタックスハイライト
import { load } from 'cheerio';
import { createHighlighter } from "shiki";

type Props = {
  params: {articleId: string};
  // sarchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  // 静的ルート生成
  const { blogs } = await getBlogArticle();
  return blogs.contents.map((article) =>({
      articleId: article.id,
  }));
};

export default async function ArticlePage({params}: Props) {
  const param = params.articleId;
 // 特定の記事の取得
  const { article } = await getBlogArticleDetail(param);

  if (!article) {
    notFound();
  }

  // console.log(article);

  const toc = createTableOfContents(article.content);
  // console.log(article.toc_visible);
  // console.log(article);
  // console.log(toc);
  const category = article.categories[0].id;
  // console.log(category);

  const { blogs } = await getBlogArticle(category);
  // console.log(blogs);

  // シンタックスハイライト
  const highlighter = await createHighlighter({
    themes: ["slack-dark"],
    langs: ["tsx", "shell", "typescript", ],
  });

  const $ = load(article.content);

  // `<html>`, `<head>`, と `<body>` タグを削除する
  $('html, head, body').each((_, elm) => {
    const htmlContent = $(elm).html();
    if (htmlContent !== null) {
      // タグの中身だけを取り出して、タグ自体は削除する
      $(elm).replaceWith(htmlContent);
    }
  });

  // ファイル名を表示するためのspanタグを生成
  $('div[data-filename]').each((_, elm) => {
    const fileName = $(elm).attr('data-filename');
    // console.log(fileName);
    if (fileName) {
      $(elm).prepend(`<span class="filename">${fileName}</span>`);
      }
  });

  $("pre code").each((_, elm) => {
    const codeText = $(elm).text();
    const className = $(elm).attr('class');
    let language;
    if (className?.includes('language-typescript')) {
      language = 'typescript';
    }
    // console.log(language);
    if (language) {
      const html = highlighter.codeToHtml(codeText, {
        lang: language,
        theme: "slack-dark",
      });
      $(elm).parent().replaceWith(html);
    }
  });

  // console.log(blogs.length);

  return (
    <Section>
      <Article.ArticleWrapper articleData={{ contents: article, richEditor: $.html(), toc: toc }} />
      {
        blogs.contents.length > 1 ? (
          <Article.ArticleCategory contents={ blogs.contents } param={param} />
        ): null
      }
    </Section>
  );
}