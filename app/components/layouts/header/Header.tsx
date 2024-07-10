'use client'
import Image from "next/image";
import Link from "next/link";
import { pageLinks, topLink } from "@/data/links";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // トップページではHeaderを表示しない
  if (pathname === '/') {
    return null;
  }

  return (
    <header className="py-5 md:py-3 px-7 md:px-5 w-full fixed z-50 backdrop-blur-md">
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