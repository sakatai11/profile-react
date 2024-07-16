import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { commonOpenGraph } from "@/data/ogp";
import { commonTwitterOpenGraph } from "@/data/twitter";
import * as Default from "./components/layouts/Index";

export const metadata: Metadata = {
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate
  },
  description: site.defaultDescription,
  openGraph: {
    ...site.defaultOpenGraph,
    ...commonOpenGraph
  },
  twitter: {
    ...commonTwitterOpenGraph
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <body className={'font-noto-sans-jp custom-font-features'}>
        <Default.Header />
          {children}
        <Default.Footer />
      </body>
    </html>
  );
}
