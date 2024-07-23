import { Category } from '@/types/cms/category';
import Link from 'next/link';

type Content = {
  categoryId: string;
  categories: Category[];
};

export async function Tab({ categoryId, categories }: Content) {
  return (
    <div className="mt-28 w-full md:mt-16">
      <div className="mx-[20%] flex items-center justify-between md:mx-0">
        <p className="md:text-xs">
          <Link
            href={'/blog'}
            scroll={false}
            className={!categoryId ? 'isActive' : 'hover-img relative'}
          >
            すべての記事
          </Link>
        </p>
        {categories.map(({ id, category }) => (
          <p className="md:text-xs" key={id}>
            <Link
              href={`/blog/${id}`}
              scroll={false}
              className={id === categoryId ? 'isActive' : 'hover-img relative'}
            >
              {category}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
