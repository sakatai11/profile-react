import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import * as Default from "./components/layouts/Index";

export const metadata: Metadata = {
  title: "portfolio site",
  description: "hogehoge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
        <body className={'font-noto-sans-jp custom-font-features'}>
        <Script src="//cdn.iframe.ly/embed.js" />
           <Default.Header />
            <Default.Main>{children}</Default.Main>
          <Default.Footer />
        </body>
    </html>
  );
}
