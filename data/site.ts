import { topLink } from "./links";
import { pageLinks } from "./links";

/** サイトの情報 */
export const Site = {
  defaultTitle: "Saka's personal website",
  defaultDescription: "クリエイターさかの個人ウェブサイトです。趣味、ウェブ技術についてまとめています。",
  titleTemplate: "%s | さか",
  defaultOpenGraph : {
    url: topLink[0].href,
    siteName: 'クリエイターさかの個人ウェブサイト',
    images: [
      {
        width: '1200',
        height: '800',
        url: '/illustration.png'
      }
    ],
    locale: 'jp',
    type: 'website',
  }
};

export const ProfileSite = {
  title: "Profile",
  description: "クリエイターさかのプロフィールです。",
  openGraph:{
    url: pageLinks[0].href
  }
};

export const BlogSite = {
  title: "Blog",
  description: "すべての記事一覧です。",
  openGraph:{
    url: pageLinks[1].href
  }
};

export const ArticleSite = {
  description: "クリエイターさかのブログです。"
};