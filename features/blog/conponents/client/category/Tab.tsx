import { Category } from "@/types/cms/category";
import Link from "next/link";

type Content = {
  contents: Category[];
  categoryId: string;
}

const Tab = ({ contents, categoryId }:Content): JSX.Element => {

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
        contents.map(({ id, category }) => (
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

export default Tab;