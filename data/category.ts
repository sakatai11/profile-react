type categoryLink = {
  name: string;
  href: string;
}

/** 各カテゴリーのリンク */
export const categoryLinks: categoryLink[] = [
  {
    name: "すべての記事",
    href: "/blog"
  },
  {
    name: "お知らせ",
    href: "/blog/news"
  },
  {
    name: "スキル",
    href: "/blog/skill"
  },
  {
    name: "コラム",
    href: "/blog/columun"
  },
];
