'use client';
import Image from 'next/image';
import Link from 'next/link';
import { pageLinks, topLink } from '@/data/links';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathName = usePathname();

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      let lastScrollTop = window.scrollY;

      const handleScroll = () => {
        // headerのスクロール位置を取得
        const header = document.querySelector('header');
        const currentScrollTop = window.scrollY;

        if (header) {
          if (currentScrollTop > lastScrollTop) {
            header.classList.add('-translate-y-full');
          } else if (currentScrollTop < lastScrollTop) {
            // 上にスクロールした場合
            header.classList.remove('-translate-y-full');
          }
          lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('touchstart', handleScroll);
      window.addEventListener('touchmove', handleScroll);

      // コンポーネントがアンマウントされるときにイベントリスナーを削除
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchstart', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
      };
    }
  }, []);

  // トップページではHeaderを表示しない
  if (pathName === '/') {
    return null;
  }

  return (
    <header className="fixed z-50 w-full px-7 py-5 backdrop-blur-md duration-500 md:px-5 md:py-3">
      <div className="flex items-center justify-between">
        <Link href={topLink.href} key={topLink.name}>
          <Image
            src="/home-img.svg"
            height={24}
            width={24}
            alt="イラスト"
            priority={true}
          />
        </Link>
        <div className="flex justify-center gap-7">
          {pageLinks.map(({ name, href }) => (
            <Link href={href} key={name} className={'linkNav'}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
