import { topLink } from "./links";
import { pageLinks } from "./links";

/** サイトの情報 */
export const Site = {
  defaultTitle: "Saka's personal website",
  defaultDescription: "クリエイターさかの個人ウェブサイトです。趣味、ウェブ技術についてまとめています。",
  titleTemplate: "%s | さか",
  defaultOpenGraph : {
    url: new URL(topLink[0].href, process.env.SERVER_DOMAIN || "").toString(), // 完全なURLを生成
    siteName: 'クリエイターさかの個人ウェブサイト',
    images: [
      {
        width: '260',
        height: '260',
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
    url: new URL(pageLinks[0].href, process.env.SERVER_DOMAIN || "").toString(), // 完全なURLを生成
    siteName: 'クリエイターさかの個人ウェブサイト',
    images: [
      {
        width: '260',
        height: '260',
        url: '/illustration.png'
      }
    ],
    locale: 'jp',
    type: 'website',
  }
};

export const BlogSite = {
  title: "Blog",
  description: "すべての記事一覧です。",
  openGraph:{
    url: new URL(pageLinks[1].href, process.env.SERVER_DOMAIN || "").toString(), // 完全なURLを生成
    siteName: 'クリエイターさかの個人ウェブサイト',
    images: [
      {
        width: '260',
        height: '260',
        url: '/illustration.png'
      }
    ],
    locale: 'jp',
    type: 'website',
  }
};

export const ArticleSite = {
  description: "クリエイターさかのブログです。"
};