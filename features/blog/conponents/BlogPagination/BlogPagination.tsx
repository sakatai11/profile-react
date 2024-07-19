import Link from "next/link";
import Image from "next/image";
import { PAGE_NAVI } from "@/types/cms/setting";
import arrow from "@/public/anker-icon.svg"

type PaginationProps = {
  basePath?:string;
  currentPage: number;
  totalCount: number;
  postlimit?: number;
};

const BlogPagination = ({basePath,currentPage,totalCount,postlimit = PAGE_NAVI.NEW_LIST_LIMIT,}: PaginationProps):JSX.Element => {
  const totalPages = Math.ceil(totalCount / postlimit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="my-20">
      <ul className="flex justify-center items-center gap-5 md:mx-16">
        {currentPage > 1 && (
          <li>
            {currentPage - 1 === 1 ? (
              <Link href={`/blog/${basePath}`}>
                <Image 
                  src={arrow}
                  height={20}
                  width={20}
                  alt="arrow-left"
                  className="rotate-90"
                  priority
                />
              </Link>
            ) : (
              <Link href={`${!basePath ? '/blog' : basePath}/p/${currentPage - 1}`}>
                <Image 
                  src={arrow}
                  height={20}
                  width={20}
                  alt="arrow-left"
                  className="rotate-90"
                  priority
                />
              </Link>
            )}
          </li>
        )}
        {pages.map((p) => (
          <li key={p} className={`${"flex justify-center items-center w-10 h-auto aspect-square"} ${currentPage !== p ? "hover:text-skyblue" : "rounded-full border border-[#0094FF]"}`}>
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
            <Image 
              src={arrow}
              height={20}
              width={20}
              alt="arrow-right"
              className="-rotate-90"
              priority
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );

};

export default BlogPagination;