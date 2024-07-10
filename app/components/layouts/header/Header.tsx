'use client'
import Image from "next/image";
import Link from "next/link";
import { pageLinks, topLink } from "@/data/links";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {

      let lastScrollTop = window.scrollY; 
  
      const handleScroll = () => {
      // headerのスクロール位置を取得
      const header = document.querySelector("header");
      const currentScrollTop = window.scrollY;

      if (header) {
        if (currentScrollTop > 50) {
          header.classList.add("-translate-y-full");
        } else if (currentScrollTop < lastScrollTop || currentScrollTop === 0) {
          // 上にスクロールした場合
          header.classList.remove("-translate-y-full");
        } 
        lastScrollTop = currentScrollTop; // 現在のスクロール位置を記録
      }
      };
  
      window.addEventListener("scroll", handleScroll);
      // コンポーネントがアンマウントされるときにイベントリスナーを削除
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

  }, []);

  // トップページではHeaderを表示しない
  if (pathname === '/') {
    return null;
  }

  return (
    <header className="py-5 md:py-3 px-7 md:px-5 w-full fixed z-50 transition-transform duration-300">
      <div className="flex justify-between items-center">
        {
          topLink.map(({name, href}) => (
        <Link href={href} key={name}>
          <Image 
            src="/home-img.svg"
            height={24}
            width={24}
            alt="イラスト"
          />
        </Link>
          ))
        }
        <div className="flex justify-center gap-7">
          {
            pageLinks.map(({name, href}) => (
              <Link href={href} key={name} className={'linkNav'}>{name}</Link>
            ))
          }
        </div>
      </div>
    </header>
  )
}

export default Header;