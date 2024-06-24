"use client";
import { usePathname } from "next/navigation";
import { Category } from "@/types/cms/category";
import Link from "next/link";

type Content = {
  contents: Category[];
}

const Tab = ({ contents }:Content): JSX.Element => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="w-full mt-28">
      <div className="flex justify-between items-center mx-[20%]">
      <p>
        <Link 
          href={"/blog"} 
          className={"/blog" === pathname ? "isActive" : ""}
        >すべての記事</Link>
      </p>
      {
        contents.map(({ id, category }) => (
          <p key={id}>
            <Link 
              href={`/blog/${id}`} 
              className={id === pathname ? "isActive" : ""}
            >{category}</Link>
          </p>
        ))
      }
      </div>
    </div>
  );
};

export default Tab;