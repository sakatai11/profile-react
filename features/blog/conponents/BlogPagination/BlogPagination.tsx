import Link from "next/link";
import { PAGE_NAVI } from "@/types/cms/setting";

type PaginationProps = {
  basePath?:string;
  currentPage: number;
  totalCount: number;
  postlimit?: number;
};

const BlogPagination = ({basePath,currentPage,totalCount,postlimit = PAGE_NAVI.NEW_LIST_LIMIT,}: PaginationProps):JSX.Element => {
  const totalPages = Math.ceil(totalCount / postlimit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log(basePath);


  return (
    <div>
      <ul>
        {currentPage > 1 && (
          <li>
            <Link href={`${!basePath ? '/blog' : basePath}/p/${currentPage - 1}`}>
              ← Previous
            </Link>
          </li>
        )}
        {pages.map((p) => (
          <li key={p}>
            {currentPage !== p ? (
              p === 1 ? (
                <Link href={`/blog/${basePath}`}>
                  {p}
                </Link>
              ) : (
                <Link href={`${!basePath ? '/blog' : basePath}/p/${p}`}>
                  {p}
                </Link>
              )
            ) : (
              <span>{p}</span>
            )}
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <Link href={`${!basePath ? '/blog' : basePath}/p/${currentPage + 1}`}>
              Next →
            </Link>
          </li>
        )}
      </ul>
    </div>
  );

};

export default BlogPagination;