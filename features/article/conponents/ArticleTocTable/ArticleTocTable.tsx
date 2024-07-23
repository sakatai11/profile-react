import { TocProps } from '@/types/cms/toc';
import Link from 'next/link';

type ArticleTocTableProps = {
  toc: TocProps[];
};

const ArticleTocTable = ({
  toc,
}: ArticleTocTableProps): JSX.Element | undefined => {
  // console.log(toc)

  return toc.length > 0 ? (
    <div className="my-14">
      <div className="p-9 md:p-5 border-solid border-2 border-[#CED1D9] rounded-lg">
        <p className="text-xl font-bold mb-2.5">目次</p>
        <ul>
          {toc.map((data) => (
            <li
              key={data.id}
              className={
                data.name === 'h2'
                  ? 'font-bold mb-1.5 bg-anker-icon bg-[2px] bg-no-repeat pl-8 last:mb-0'
                  : 'font-medium mb-2.5 bg-anker-icon bg-13 bg-[33px] bg-no-repeat pl-14 last:mb-0'
              }
            >
              <Link href={`#${data.id}`} className="hover:underline">
                {data.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : undefined;
};

export default ArticleTocTable;
