import { Images } from '@/types/ogp/seoOgp';

type CommonOpenGraph = {
  siteName: string;
  images: Images[];
  locale: string;
  type: string;
};

// top,profile,blog対応
export const commonOpenGraph: CommonOpenGraph = {
  siteName: 'クリエイターさかのウェブサイト',
  images: [
    {
      width: '260',
      height: '260',
      url: new URL(
        '/illustration.webp',
        process.env.SERVER_DOMAIN || 'https://saka-tai.com',
      ).toString(), // URLを生成
    },
  ],
  locale: 'ja_JP',
  type: 'website',
};
