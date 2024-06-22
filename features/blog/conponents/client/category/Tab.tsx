"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

type categoryLink = {
  name: string;
  href: string;
};

type TabProps = {
  categoryLinks: categoryLink[];
};


const Tab = ({ categoryLinks }: TabProps): JSX.Element => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center mx-[20%]">
    {
      categoryLinks.map(({ name, href }) => (
        <p key={name}>
          <Link href={href} className={href === pathname ? "isActive" : ""}>{name}</Link>
        </p>
      ))
    }
  </div>
  );
};

export default Tab;