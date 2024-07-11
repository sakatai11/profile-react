import { getBlogArticle } from "@/libs/microcms";
import { PAGE_NAVI } from "@/types/cms/setting";
import CurrentCategoryPage from "../../[categoryId]/p/[current]/page";

type Props = {
  params: {
    categoryId: string;
    current: string;
  };
};

export async function generateStaticParams() {
  const { blogs } = await getBlogArticle("",{
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
  });

  // 総ページ数
  const totalPages = Math.ceil(blogs.totalCount / PAGE_NAVI.NEW_LIST_LIMIT )

  // パラメータを生成
  return [...Array(totalPages)].map((_, i) => ({
    current: (i + 1).toString(), // 数値を文字列に変換
  }));
}

export default function CurrentBlogIndex({ params }: Props) {
  const { current } = params;

  // 全ての記事を表示
  return (
    <CurrentCategoryPage params={{ categoryId: '', current}} />
  );
}