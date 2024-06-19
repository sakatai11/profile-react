'use client'
import { usePathname } from 'next/navigation';

type Children = {
  children: React.ReactNode
}

const Main: React.FC<Children> = ({children}) => {
  const pathname: string  = usePathname();

  return (
    <main className={pathname == '/' ? 'calc-100' : 'pt-[8.15rem] calc-min-100'} >
      {children}
    </main>
  )
}

export default Main;