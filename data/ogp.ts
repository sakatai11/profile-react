import { Images } from "@/types/ogp/seoOgp";

type CommonOpenGraph = {
  siteName: string;
  images: Images[];
  locale: string;
  type: string;
};

// top,profile,blog対応
export const commonOpenGraph:CommonOpenGraph  = {
  siteName: 'クリエイターさかの個人ウェブサイト',
  images: [
    {
      width: '260',
      height: '260',
      url: '/illustration.webp'
    }
  ],
  locale: 'jp',
  type: 'website',
};
