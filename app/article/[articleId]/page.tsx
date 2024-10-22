import { getBlogArticle, getBlogArticleDetail } from '../../_libs/microcms';
import MotionWrapper from '@/app/_components/motion/motionWrapper';
import { createTableOfContents } from '../../_libs/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { articleSite } from '@/data/site';
import * as Article from '@/features/article/conponents/Index';
import dummy from '@/public/dummy.png';
// シンタックスハイライト
import { load } from 'cheerio';
import { createHighlighter } from 'shiki';

type Props = {
  params: { articleId: string };
  searchParams: { dk?: string };
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { article } = await getBlogArticleDetail(
    params.articleId,
    searchParams.dk,
  );

  return {
    title: article.title,
    description: articleSite.description,
    openGraph: {
      url: new URL(
        `/article/${params.articleId}`,
        process.env.SERVER_DOMAIN || '',
      ).toString(),
      siteName: 'クリエイターさかの個人ウェブサイト',
      images: [
        {
          width: article.eyecatch?.width ? article.eyecatch?.width : '1280',
          height: article.eyecatch?.height ? article.eyecatch?.height : '800',
          url: article.eyecatch?.url
            ? article.eyecatch.url
            : new URL(dummy.src, process.env.SERVER_DOMAIN || '').toString(), // URLを生成
        },
      ],
      locale: 'jp',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@skt1910hg_r',
    },
  };
};

export default async function ArticlePage({ params, searchParams }: Props) {
  const param = params.articleId;
  const draftKey = searchParams.dk;

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
    langs: [
      'tsx',
      'shell',
      'typescript',
      'javascript',
      'html',
      'css',
      'json',
      'powershell',
    ],
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
    if (fileName) {
      $(elm).prepend(`<span class="filename">${fileName}</span>`);
    } else {
      return;
    }
  });

  $('pre code').each((_, elm) => {
    const codeText = $(elm).text();
    const className = $(elm).attr('class');
    let language;
    // クラス名から言語を抽出
    if (className) {
      const match = className.match(/language-(\w+)/);
      if (match) {
        language = match[1];
      }
    }

    if (language) {
      const html = highlighter.codeToHtml(codeText, {
        lang: language,
        theme: 'slack-dark',
      });
      $(elm).parent().replaceWith(html);
    }
  });

  return (
    <>
      {draftKey && <p className="text-center text-red-500">プレビュー画面</p>}
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
