import { getBlogArticle, getBlogArticleDetail } from "@/libs/microcms";
import MotionWrapper from "@/app/components/motion/motionWrapper";
import { createTableOfContents } from "@/libs/utils";
import { notFound } from "next/navigation";
import { PAGE_NAVI } from "@/types/cms/setting";
import type { Metadata } from "next";
import { articleSite } from "@/data/site";
import * as Article from "@/features/article/conponents/Index";
import dummy from "@/public/dummy.png";
// シンタックスハイライト
import { load } from 'cheerio';
import { createHighlighter } from "shiki";

type Props = {
  params: {articleId: string};
  // sarchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { article } = await getBlogArticleDetail(params.articleId);

    return {
      title: article.title,
      description: articleSite.description,
      openGraph : {
        url: new URL(`/article/${params.articleId}`,process.env.SERVER_DOMAIN || "").toString(),
        siteName: 'クリエイターさかの個人ウェブサイト',
        images: [
          {
            width: article.eyecatch?.width ? article.eyecatch?.width : "1280",
            height: article.eyecatch?.height ? article.eyecatch?.height : "800",
            url: article.eyecatch?.url ? article.eyecatch.url : dummy.src,
          }
        ],
        locale: 'jp',
        type: 'website',
      },
      twitter: {
        card: "summary_large_image", 
        site: "@skt1910hg_r"
      }
    };
}

export async function generateStaticParams() {
  // 静的ルート生成
  const { blogs } = await getBlogArticle("",{
    limit: PAGE_NAVI.ARTICLE_LIST_LIMIT, //取得記事数
  });

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

  const toc = createTableOfContents(article.content);

  const category = article.categories[0].id;

  const { blogs } = await getBlogArticle(category);

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
    <>
      <MotionWrapper>
        <Article.ArticleWrapper articleData={{ contents: article, richEditor: $.html(), toc: toc }} />
      </MotionWrapper>
      <Article.ArticleShare param={param} title={article.title}  />
      {
        blogs.contents.length > 1 ? (
          <Article.ArticleCategory contents={ blogs.contents } param={param} />
        ): null
      }
    </>
  );
}