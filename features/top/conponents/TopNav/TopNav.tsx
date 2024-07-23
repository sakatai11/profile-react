import Link from 'next/link';
import { pageLinks } from '@/data/links';

const TopNav = () => {
  return (
    <div className="flex items-center justify-center gap-16 md:gap-10">
      {pageLinks.map(({ name, href }) => (
        <Link
          href={href}
          key={name}
          className="hover-img relative after:content-[''] after:w-6/12 after:h-1 after:bg-skyblue after:block after:m-auto after:rounded inline-block font-spartan font-normal text-2xl md:text-lg tracking-wider leading-relaxed"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default TopNav;
