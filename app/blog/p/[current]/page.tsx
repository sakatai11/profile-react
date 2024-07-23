import { getBlogArticle } from '@/libs/microcms';
import { PAGE_NAVI } from '@/types/cms/setting';
import CurrentCategoryPage from '../../[categoryId]/p/[current]/page';
import { blogSite } from '@/data/site';
import type { Metadata } from 'next';

type Props = {
  params: {
    categoryId: string;
    current: string;
  };
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
      // 各カテゴリの最初のページを除外
      if (currentPage === '1') {
        return null;
      }
      return {
        current: currentPage,
      };
    })
    .filter(Boolean); // null値を削除
}

export default function CurrentBlogIndex({ params }: Props) {
  const { current } = params;

  // 全ての記事を表示
  return <CurrentCategoryPage params={{ categoryId: '', current }} />;
}
