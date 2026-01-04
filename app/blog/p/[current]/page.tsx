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
