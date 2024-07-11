'use client'
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();
  
    // トップページではFooterを表示しない
    if (pathName === '/') {
      return null;
    }


  return (
    <footer className="py-5 text-center">
      <p>© Saka & Tai 2024</p>
    </footer>
  );
}

export default Footer;