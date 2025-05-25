import { getBlogArticle, getBlogArticleDetail } from '../../_libs/microcms';
import MotionWrapper from '@/app/_components/motion/motionWrapper';
import { createTableOfContents } from '../../_libs/utils';
import { notFound } from 'next/navigation';
import { PAGE_NAVI } from '@/types/cms/setting';
import type { Metadata } from 'next';
import { articleSite } from '@/data/site';
import * as Article from '@/features/article/conponents/Index';
import dummy from '@/public/dummy.png';
// シンタックスハイライト
import { load } from 'cheerio';
import { createHighlighter } from 'shiki';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ articleId: string }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const { article } = await getBlogArticleDetail(params.articleId);

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

export async function generateStaticParams() {
  // 静的ルート生成
  const { blogs } = await getBlogArticle('', {
    limit: PAGE_NAVI.ARTICLE_LIST_LIMIT, // 取得記事数
  });

  return blogs.contents.map((article) => ({
    articleId: article.id,
  }));
}

export default async function ArticlePage(props: Props) {
  const params = await props.params;
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
      <MotionWrapper>
      <div className='mt-[36px] w-full overflow-hidden rounded-lg border border-solid shadow'>
        <Link href='#' className='block'>
          <div className='flex h-36 items-center'>
            <div className='aspect-square h-36 w-36'>
              <Image
                src='https://placehold.jp/30/dd6699/ffffff/300x150.png?text=placeholder+image'
                alt='Markdown Editor'
                width={144}
                height={144}
                loading='lazy'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='flex h-full w-full flex-col justify-center p-3'>
             <h3 className='mb-2 font-medium'>このコンテンツは、Markdownで書かれた記事をRich Text Editorで編集したものです。</h3>

             <div className='flex aspect-square h-5 w-5 items-center gap-1'>
                <Image
                  src='/no-image-ogp.png'
                  alt='Markdown Editor'
                  width={16}
                  height={16}
                  loading='lazy'
                />
                <span className='text-sm text-[#686868]'>https://example.com</span>
             </div>
            </div>
          </div>
        </Link>
      </div>
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
