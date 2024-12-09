import CategoryPage from './[categoryId]/page';
import type { Metadata } from 'next';
import { blogSite } from '@/data/site';

export const metadata: Metadata = {
  title: blogSite.title,
  description: blogSite.description,
};

export default async function BlogIndex() {
  // defaultPropsのparamsをPromiseでラップ
  const defaultProps = {
    params: Promise.resolve({
      categoryId: '', // デフォルトカテゴリID
    }),
  };

  // 非同期でCategoryPageコンポーネントをレンダリング
  return <CategoryPage {...defaultProps} />;
}
