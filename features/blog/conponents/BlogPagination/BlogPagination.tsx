import Link from "next/link";
import { PAGE_NAVI } from "@/types/cms/setting";

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  postlimit?: number;
};

const BlogPagination = ({currentPage,totalCount,postlimit = PAGE_NAVI.NEW_LIST_LIMIT,}: PaginationProps):JSX.Element => {
  // const pages = Array.from(
  //   length: Math.ceil(totalCount)
  // );

  return (
    <>
      <p>{currentPage}</p>
      <p>{totalCount}</p>
      <p>{postlimit}</p>
    </>
  );

};

export default BlogPagination;