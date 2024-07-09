import { getBlogArticle } from "@/libs/microcms";
import { PAGE_NAVI } from "@/types/cms/setting";
import CurrentCategoryPage from "../../[categoryId]/p/[current]/page";

const defaultProps = {
  params: {
    categoryId: '',
    current: '2'
  }
};

export async function generateStaticParams() {
  const { blogs } = await getBlogArticle("",{
    limit: PAGE_NAVI.NEW_LIST_LIMIT,
  });

  // 総ページ数
  const totalPages = Math.ceil(blogs.totalCount / PAGE_NAVI.NEW_LIST_LIMIT )

  // パラメータを生成
  return [...Array(totalPages)].map((_, i) => ({
    current: (i + 2).toString(), // 数値を文字列に変換
  }));
}

export default function CurrentBlogIndex() {

  // 全ての記事を表示
  return (
    <CurrentCategoryPage {...defaultProps} />
  );
}