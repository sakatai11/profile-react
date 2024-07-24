// //SSR
// export const dynamic = 'force-dynamic';

import { getBlogArticle, getBlogArticleDetail } from '@/libs/microcms';
import MotionWrapper from '@/app/components/motion/motionWrapper';
import { createTableOfContents } from '@/libs/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import * as Article from '@/features/article/conponents/Index';
// シンタックスハイライト
import { load } from 'cheerio';
import { createHighlighter } from 'shiki';

//noindexで検索エンジンにインデックスされないようにする
export const metadata: Metadata = {
  robots: 'noindex',
};

type Props = {
  params: { articleId: string };
  searchParams: { [draftKey: string]: string | undefined };
};

export default async function ArticleDraftPage({
  params,
  searchParams,
}: Props) {
  const param = params.articleId;
  const { draftKey } = searchParams;

  // 特定の記事の取得
  const { article } = await getBlogArticleDetail(param, draftKey);

  if (!article) {
    notFound();
  }

  const toc = createTableOfContents(article.content);

  const category = article.categories[0].id;

  const { blogs } = await getBlogArticle(category);

  // シンタックスハイライト
  const highlighter = await createHighlighter({
    themes: ['slack-dark'],
    langs: ['tsx', 'shell', 'typescript'],
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

  $('pre code').each((_, elm) => {
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
        theme: 'slack-dark',
      });
      $(elm).parent().replaceWith(html);
    }
  });

  // console.log(blogs.length);

  return (
    <>
      {/* 下書きのプレビュー中であることを示すメッセージを表示 */}
      <div className="text-center text-red-500">プレビュー画面です</div>
      <MotionWrapper>
        <Article.ArticleWrapper
          articleData={{ contents: article, richEditor: $.html(), toc: toc }}
        />
      </MotionWrapper>
      <Article.ArticleShare param={param} title={article.title} />
      {blogs.contents.length > 1 ? (
        <Article.ArticleCategory contents={blogs.contents} param={param} />
      ) : null}
    </>
  );
}
