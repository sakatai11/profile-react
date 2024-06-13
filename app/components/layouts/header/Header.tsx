'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    let lastScrollTop = window.scrollY; 

		const handleScroll = () => {
    // headerのスクロール位置を取得
    const header = document.querySelector("header");
    if (header) {
      const currentScrollTop = window.scrollY;
  
      if (currentScrollTop > lastScrollTop) {
        header.classList.add("-translate-y-full");
      } else if (currentScrollTop < lastScrollTop) {
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

  }, []);

  return (
    <header className="py-5 px-7 w-full fixed transition-transform duration-300">
      <div className="flex justify-between items-center">
        <Link href='/'>
            <Image 
              src="/home-img.svg"
              height={24}
              width={24}
              alt=""
            />
        </Link>
        <div className="flex justify-center gap-7">
          <Link href='/profile'>Profile</Link>
          <Link href='/blog'>Blog</Link>
        </div>
      </div>
    </header>
  )
}

export default Header;