"use client";

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  postlimit?: number;
};

const Button = ({currentPage, totalCount, postlimit }: PaginationProps): JSX.Element => {

  return (
    <>
      <button>クリックして</button>
    </>
  );
}

export default Button;