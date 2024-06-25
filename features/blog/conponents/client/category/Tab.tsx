import { getCategory } from "@/libs/microcms";
import Link from "next/link";

type Content = {
  categoryId: string;
}

export async function Tab({ categoryId }:Content) {
  const { categories } = await getCategory();

  return (
    <div className="w-full mt-28">
      <div className="flex justify-between items-center mx-[20%]">
      <p>
        <Link 
          href={"/blog"} 
          scroll={false}
          className={!categoryId ? "isActive" : ""}
        >すべての記事</Link>
      </p>
      {
        categories.map(({ id, category }) => (
          <p key={id}>
            <Link 
              href={`/blog/${id}`} 
              scroll={false}
              className={id === categoryId ? "isActive" : ""}
            >{category}</Link>
          </p>
        ))
      }
      </div>
    </div>
  );
};