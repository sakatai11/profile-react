'use client'
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode
}

const Main = ({children}: Children): JSX.Element => {
  const pathname: string  = usePathname();

  return (
    <main className={pathname == '/' ? 'calc-100' : 'pt-[6.45rem] calc-min-100'} >
      {children}
    </main>
  )
}

export default Main;