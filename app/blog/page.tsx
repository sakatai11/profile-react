import CategoryPage from "./[categoryId]/page";

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