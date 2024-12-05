'use client';

import Section from './_components/layouts/common/Section';
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode;
};

export default function Template({ children }: Children): React.ReactElement {
  const pathName = usePathname();

  return (
    <main className={pathName === '/' ? 'h-svh' : 'calc-min-100 pt-[6.45rem]'}>
      {pathName === '/' ? children : <Section>{children}</Section>}
    </main>
  );
}
