import { getBlogArticle } from '@/app/_libs/microcms';
import { PAGE_NAVI } from '@/types/cms/setting';
import CurrentCategoryPage from '@/app/blog/[categoryId]/p/[current]/page';
import { blogSite } from '@/data/site';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    categoryId: string;
    current: string;
  }>;
};

export const metadata: Metadata = {
  title: blogSite.title,
  description: blogSite.description,
};

export async function generateStaticParams() {
  const { blogs } = await getBlogArticle('', {
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
  });

  // 総ページ数
  const totalPages = Math.ceil(blogs.totalCount / PAGE_NAVI.NEW_LIST_LIMIT);

  // パラメータを生成
  return [...Array(totalPages)]
    .map((_, i) => {
      const currentPage = (i + 1).toString();
      // totalPagesが2以降存在する場合、各カテゴリの最初のページを除外
      if (currentPage === '1' && totalPages > 1) {
        return null;
      }
      return {
        current: currentPage,
      };
    })
    .filter(Boolean); // null値を削除
}

export default async function CurrentBlogIndex(props: Props) {
  const params = await props.params;

  // categoryIdのデフォルト値を設定
  const categoryId = ''; // 必要に応じて設定

  // 全ての記事を表示
  return (
    <CurrentCategoryPage
      params={Promise.resolve({ categoryId, current: params.current })}
    />
  );
}
