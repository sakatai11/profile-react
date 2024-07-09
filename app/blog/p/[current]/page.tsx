import { getBlogArticle } from "@/libs/microcms";
import { notFound } from "next/navigation";
import { PAGE_NAVI } from "@/types/cms/setting";

type Props = {
  params: {
    current: string;
  };
};

export async function generateStaticParams() {

  const { blogs } = await getBlogArticle("",{
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
    offset: 0,
  });

  // 総ページ数
  const totalPages = Math.ceil(blogs.totalCount / PAGE_NAVI.NEW_LIST_LIMIT )

  // パラメータを生成
  return [...Array(totalPages)].map((_, i) => ({
    current: (i + 1).toString(), // 数値を文字列に変換
  }));

  // console.log(paramsArray, "ページネーション");

  // return paramsArray;
}

export default async function Page({ params }: Props) {
  const current = parseInt(params.current as string, 10);

  console.log(current);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const { blogs } = await getBlogArticle("",{
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
    offset: PAGE_NAVI.NEW_LIST_LIMIT * (current - 1),
  });

  if (blogs.contents.length === 0) {
    notFound();
  }

  return (
    <>
      <p>ページネーション</p>
    </>
  );
}

// import CategoryCurrentPage from "./[categoryId]/page";

// export default function BlogIndex() {
//   // categoryIdが空の場合に渡すデフォルトのprops
//   const defaultProps = {
//     params: { 
//       categoryId: '',
//       current: '',
//     }
//   };

//   // 全ての記事を表示
//   return (
//     <CategoryPage {...defaultProps} />
//   );
// }