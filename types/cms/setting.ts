type PageNaviProps = {
  NEW_LIST_LIMIT: number;
  ARTICLE_LIST_LIMIT: number;
};

// 記事数の設定
export const PAGE_NAVI: PageNaviProps = {
  NEW_LIST_LIMIT: 9, // 1ページあたりの表示数
  ARTICLE_LIST_LIMIT: 50, // 全記事取得数
};
