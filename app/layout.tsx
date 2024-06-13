import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as Default from "./components/layouts/Index";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <Default.Header />
            <main>{children}</main>
          <Default.Footer />
        </body>
    </html>
  );
}
