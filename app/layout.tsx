import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';
import { commonOpenGraph } from '@/data/ogp';
import { commonTwitterOpenGraph } from '@/data/twitter';
import * as Default from './_components/layouts/Index';

const NotoSansJPFont = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate,
  },
  description: site.defaultDescription,
  openGraph: {
    ...site.defaultOpenGraph,
    ...commonOpenGraph,
  },
  twitter: {
    ...commonTwitterOpenGraph,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${NotoSansJPFont.className} custom-font-features`}>
        <Default.Header />
        {children}
        <Default.Footer />
      </body>
    </html>
  );
}
