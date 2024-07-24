import { copyLink } from '@/data/share';
import Image from 'next/image';
import Copy from '@/app/components/elements/copy/Index';
import SnsBtn from '@/app/components/elements/snsBtn/Index';

type ParamProps = {
  param: string;
  title: string;
};

const ArticleShare = ({ param, title }: ParamProps): JSX.Element => {
  const url = process.env.SERVER_DOMAIN + '/article/' + param;

  if (!url) {
    console.error('URLが正しく生成されませんでした。');
    return <div>エラーが発生しました。</div>;
  }

  return (
    <section>
      <div className="mx-[12.5%] md:mx-0">
        <div className="border-t-2 border-[#CED1D9] py-14">
          <h2 className="mx-auto flex w-fit items-center font-medium before:mr-4 before:inline-block before:size-5 before:bg-share-icon before:bg-contain before:bg-no-repeat before:align-middle">
            記事をシェア
          </h2>
          <ul className="mt-14 flex items-center justify-center gap-14 md:gap-10">
            <SnsBtn url={url} title={title} />
            <li className="relative">
              <Copy url={url}>
                <Image
                  src={copyLink.src}
                  width={35}
                  height={35}
                  alt={copyLink.alt}
                  priority
                  sizes="100vw"
                />
              </Copy>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ArticleShare;
