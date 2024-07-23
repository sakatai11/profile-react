import { ProfileContents } from '@/types/cms/profile';
import { accountLinks } from '@/data/accounts';
import parse from 'html-react-parser';
import Link from 'next/link';
import MicroCmsImage from '@/features/components/MicroCmsImage/MicroCmsImage';
import Image from 'next/image';
import illustration from '/public/illustration.webp';
import React from 'react';

type ProfileDataProps = {
  contents: ProfileContents[];
};

const ProfileWrapper = ({ contents }: ProfileDataProps): JSX.Element => {
  return (
    <div className="mt-28 w-full md:mt-11">
      <div className="mx-[12.5%] flex justify-center gap-24 md:mx-0 md:mb-10 md:flex-col md:gap-12">
        <div className="flex flex-1 flex-col items-center gap-6">
          <div className="mt-2 md:size-44">
            <Image
              src={illustration}
              height={260}
              width={260}
              alt="イラスト"
              className="m-auto"
              priority
            />
          </div>
          <div className="flex items-center justify-start gap-8">
            {contents.map((profile) =>
              profile.link_icon.map((icon) => {
                // URLからファイル名を抽出
                const iconName =
                  icon.url?.split('/').pop()?.split('.')[0] ?? 'default-icon';
                // accountLinksから対応するリンクを検索
                const link = accountLinks.find(
                  (link) => link.icon === iconName,
                );
                return (
                  <div key={iconName} className="size-5">
                    <Link
                      href={link ? link.href : '#'}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <MicroCmsImage
                        src={icon.url}
                        width={icon.width || 32}
                        height={icon.height || 32}
                        alt={iconName}
                      />
                    </Link>
                  </div>
                );
              }),
            )}
          </div>
        </div>
        <div className="flex-1">
          {contents.map((profile) => (
            <React.Fragment key={profile.id}>
              <div className="pb-[30px]">
                <p className="text-3xl md:text-center md:text-2xl">
                  {profile.name}
                </p>
              </div>
              <div className="space border-t border-solid border-black pt-[30px]">
                {parse(profile.my_info)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
