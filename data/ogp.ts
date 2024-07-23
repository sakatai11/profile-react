import { Images } from '@/types/ogp/seoOgp';

type CommonOpenGraph = {
  siteName: string;
  images: Images[];
  locale: string;
  type: string;
};

// top,profile,blog対応
export const commonOpenGraph: CommonOpenGraph = {
  siteName: 'クリエイターさかの個人ウェブサイト',
  images: [
    {
      width: '260',
      height: '260',
      url: new URL(
        '/illustration.webp',
        process.env.SERVER_DOMAIN || '',
      ).toString(), // URLを生成
    },
  ],
  locale: 'jp',
  type: 'website',
};
