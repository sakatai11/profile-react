import CategoryPage from "./[categoryId]/page";
import type { Metadata } from "next";
import { blogSite } from "@/data/site";
import { commonOpenGraph } from "@/data/ogp";
import { commonTwitterOpenGraph } from "@/data/twitter";

export const metadata: Metadata = {
  title: blogSite.title,
  description: blogSite.description,
  openGraph: {
    ...blogSite.openGraph,
    ...commonOpenGraph,
  },
  twitter: {
    ...commonTwitterOpenGraph
  }
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