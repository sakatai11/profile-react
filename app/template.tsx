'use client';
import Section from './components/layouts/common/Section';
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode;
};

export default function Template({ children }: Children): JSX.Element {
  const pathName = usePathname();
  // console.log('anme');

  return (
    <main className={pathName === '/' ? 'h-svh' : 'pt-[6.45rem] calc-min-100'}>
      {pathName === '/' ? children : <Section>{children}</Section>}
    </main>
  );
}
