'use client';
// SSG
export const dynamic = 'force-static';

import Section from './components/layouts/common/Section';
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode;
};

export default function Template({ children }: Children): JSX.Element {
  const pathName = usePathname();
  // console.log('anme');

  return (
    <main className={pathName === '/' ? 'h-svh' : 'calc-min-100 pt-[6.45rem]'}>
      {pathName === '/' ? children : <Section>{children}</Section>}
    </main>
  );
}
