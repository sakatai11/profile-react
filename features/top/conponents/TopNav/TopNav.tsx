import Link from 'next/link';
import { pageLinks } from '@/data/links';

const TopNav = () => {
  return (
    <div className="flex items-center justify-center gap-16 md:gap-10">
      {pageLinks.map(({ name, href }) => (
        <Link
          href={href}
          key={name}
          className="hover-img relative inline-block font-spartan text-2xl font-normal leading-relaxed tracking-wider after:m-auto after:block after:h-1 after:w-6/12 after:rounded after:bg-skyblue after:content-[''] md:text-lg"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default TopNav;
