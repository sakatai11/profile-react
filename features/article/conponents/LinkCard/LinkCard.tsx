import Link from 'next/link';
import Image from 'next/image';
import { getOgp } from '@/app/_action/getOgp';
import noImage from '@/public/no-image-ogp.png';
import React from 'react';

type LinkCardProps = {
  url: string;
};

const LinkCard = async ({
  url,
}: LinkCardProps): Promise<React.ReactElement> => {
  const ogp = await getOgp(url);

  return (
    <div className="mt-[36px] w-full overflow-hidden rounded-lg border border-solid shadow">
      <Link href={ogp.url} className="block" target="_blank">
        <div className="flex h-36 items-center">
          <div className="aspect-square size-36">
              <Image
                src={ogp.image || noImage}
                unoptimized
                alt=""
                width={144}
                height={144}
                loading="lazy"
                className="size-full object-cover"
              />
          </div>
          <div className="flex size-full flex-col justify-center p-3">
            <h3 className="mb-2 font-medium">{ogp.title || ogp.url}</h3>
            <div className="flex h-5 items-center gap-1">
              {ogp.favicon && (
                <Image
                  src={ogp.favicon}
                  unoptimized
                  alt="favicon"
                  width={16}
                  height={16}
                  loading="lazy"
                />
              )}
              <span className="text-sm text-[#686868]">{ogp.domain}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LinkCard;
