'use client'
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
    // トップページではFooterを表示しない
    if (pathname === '/') {
      return null;
    }


  return (
    <footer className="py-5 text-center">
      <p>© Saka & Tai 2024</p>
    </footer>
  );
}

export default Footer;