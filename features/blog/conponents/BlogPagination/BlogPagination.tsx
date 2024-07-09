import Link from "next/link";
import { PAGE_NAVI } from "@/types/cms/setting";

type PaginationProps = {
  basePath?:string;
  currentPage: number;
  totalCount: number;
  postlimit?: number;
};

const BlogPagination = ({basePath,currentPage,totalCount,postlimit = PAGE_NAVI.NEW_LIST_LIMIT,}: PaginationProps):JSX.Element => {
  const pages = Array.from(
    { length: Math.ceil(totalCount / postlimit) },
    (_, i) => i + 1
  );

  return (
    <div>
      <ul>
        {pages.map((p) => (
          <li key={p}>
            {currentPage !== p ? (
              p === 1 ? (
                <Link href={`/blog/${basePath}`}>
                  {p}
                </Link>
              ) : (
                <Link href={`${!basePath ? '/blog' : basePath }/p/${p}`}>
                  {p}
                </Link>
              )
            ) : (
              <span>{p}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default BlogPagination;