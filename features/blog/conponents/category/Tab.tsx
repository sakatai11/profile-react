import { Category } from "@/types/cms/category";
import Link from "next/link";

type Content = {
  categoryId: string;
  categories: Category[];
}

export async function Tab({ categoryId, categories }:Content) {

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