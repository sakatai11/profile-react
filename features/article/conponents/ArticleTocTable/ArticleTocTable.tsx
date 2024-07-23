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
      <div className="rounded-lg border-2 border-solid border-[#CED1D9] p-9 md:p-5">
        <p className="mb-2.5 text-xl font-bold">目次</p>
        <ul>
          {toc.map((data) => (
            <li
              key={data.id}
              className={
                data.name === 'h2'
                  ? 'mb-1.5 bg-anker-icon bg-[2px] bg-no-repeat pl-8 font-bold last:mb-0'
                  : 'mb-2.5 bg-anker-icon bg-13 bg-[33px] bg-no-repeat pl-14 font-medium last:mb-0'
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
