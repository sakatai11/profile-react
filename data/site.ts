import { topLink } from './links';
import { pageLinks } from './links';
import { OpenGraph, SiteConfig } from '@/types/ogp/seoOgp';

//blog,profile,articleで利用
export type SiteInfo = {
  title?: string;
  description: string;
  openGraph?: OpenGraph;
};

/** サイトの情報 */
export const site: SiteConfig = {
  defaultTitle: 'saka.dev',
  defaultDescription:
    'クリエイターさかのウェブサイトです。趣味、ウェブ技術についてまとめています。',
  titleTemplate: '%s | saka.dev',
  defaultOpenGraph: {
    url: new URL(topLink.href, process.env.SERVER_DOMAIN || 'http://localhost:3000').toString(), // 完全なURLを生成
  },
};

export const profileSite: SiteInfo = {
  title: 'Profile',
  description: 'クリエイターさかのプロフィールです。',
  openGraph: {
    url: new URL(pageLinks[0].href, process.env.SERVER_DOMAIN || 'http://localhost:3000').toString(), // 完全なURLを生成
  },
};

export const blogSite: SiteInfo = {
  title: 'Blog',
  description: 'すべての記事一覧です。',
  openGraph: {
    url: new URL(pageLinks[1].href, process.env.SERVER_DOMAIN || 'http://localhost:3000').toString(), // 完全なURLを生成
  },
};

export const articleSite: SiteInfo = {
  description: 'クリエイターさかのブログです。',
};

export const contactSite: SiteInfo = {
  title: 'Contact',
  description: 'クリエイターさかのお問い合わせです。',
  openGraph: {
    url: new URL(pageLinks[1].href, process.env.SERVER_DOMAIN || '').toString(), // 完全なURLを生成
  },
};
