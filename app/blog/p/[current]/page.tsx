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

export default function CurrentBlogIndex({ params }: Props) {
  const { current } = params;

  // 全ての記事を表示
  return <CurrentCategoryPage params={{ categoryId: '', current }} />;
}
