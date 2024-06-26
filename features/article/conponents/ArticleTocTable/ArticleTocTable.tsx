import { TocProps } from "@/types/cms/toc";
import Link from "next/link";

type ArticleTocTableProps = {
  toc: TocProps[];
};

const ArticleTocTable = ({toc}:ArticleTocTableProps):JSX.Element => {
  console.log(toc)

  return (
    <div>
      <p>目次</p>
      <ul>
        {toc.map((data) => (
          <li key={data.id}>
            <Link href={`#${data.id}`}>{data.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleTocTable;