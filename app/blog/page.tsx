import CategoryPage from "./[categoryId]/page";
import type { Metadata } from "next";
import { BlogSite } from "@/data/site";

export const metadata: Metadata = {
  title: BlogSite.title,
  description: BlogSite.description,
  openGraph: BlogSite.openGraph
};

export default function BlogIndex() {
  // categoryIdが空の場合に渡すデフォルトのprops
  const defaultProps = {
    params: { 
      categoryId: '' 
    }
  };

  // 全ての記事を表示
  return <CategoryPage {...defaultProps} />;
}