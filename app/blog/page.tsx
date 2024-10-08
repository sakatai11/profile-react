// SSG
export const dynamic = 'force-static';

import CategoryPage from './[categoryId]/page';
import type { Metadata } from 'next';
import { blogSite } from '@/data/site';

export const metadata: Metadata = {
  title: blogSite.title,
  description: blogSite.description,
};

export default function BlogIndex() {
  // categoryIdが空の場合に渡すデフォルトのprops
  const defaultProps = {
    params: {
      categoryId: '',
    },
  };

  // 全ての記事を表示
  return <CategoryPage {...defaultProps} />;
}
