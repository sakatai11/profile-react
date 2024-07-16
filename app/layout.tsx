import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Site } from "@/data/site";
import * as Default from "./components/layouts/Index";

export const metadata: Metadata = {
  title: {
    default: Site.defaultTitle,
    template: Site.titleTemplate
  },
  description: Site.defaultDescription,
  openGraph: {
    ...Site.defaultOpenGraph
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
