import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import Template from "./template";
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
        <Default.Header />
          {children}
        <Default.Footer />
      </body>
    </html>
  );
}
