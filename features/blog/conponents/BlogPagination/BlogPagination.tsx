// import { PaginationType } from "@/types/cms/pagination";

type TotalCountProps = {
  totalCount: number;
  currentPage: number;
}

const BlogPagination = ({totalCount, currentPage}:TotalCountProps):JSX.Element => {
  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div>
      <p>{`現在のページ: ${currentPage}`}</p>
      <p>{`総ページ数: ${totalPages}`}</p>
    </div>
  );
}

export default BlogPagination;