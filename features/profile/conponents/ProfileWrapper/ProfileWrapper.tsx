import { ProfileContents } from "@/types/cms/profile";
import { accountLinks } from "@/data/accounts";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import illustration from "/public/illustration.png";
import React from "react";

type ProfileDataProps = {
  contents: ProfileContents[];
};

const ProfileWrapper = ({contents}:ProfileDataProps):JSX.Element => {
  return (
    <div className="w-full mt-28">
    <div className="flex justify-center gap-24 mx-[12.5%]">
      <div className="flex flex-col items-center flex-1 gap-6">
        <div className="mt-2">
          <Image 
            src={illustration}
            height={260}
            width={260}
            alt="イラスト"
            className="m-auto"
            />
        </div>
        <div className="flex justify-start items-center gap-8">
          {
            contents.map((profile) => (
              profile.link_icon.map((icon) => {
                // URLからファイル名を抽出
                const iconName = icon.url?.split('/').pop()?.split('.')[0] ?? 'default-icon';
                // accountLinksから対応するリンクを検索
                const link = accountLinks.find(link => link.icon === iconName);
                return (
                  <div key={iconName} className="w-5 h-5">
                    <Link href={link ? link.href : '#'} rel="noopener noreferrer" target="_blank">
                      <Image src={icon.url} height={icon.height} width={icon.width} alt={iconName} />
                    </Link>
                  </div>
                )
              })
            ))
          }
        </div>
      </div>
      <div className="flex-1">
        {
          contents.map((profile) => (
            <React.Fragment key={profile.id}>
              <div className="pb-[30px]">
                <p className="text-3xl tracking-widest">{profile.name}</p>
              </div>
              <div className="space pt-[30px] border-solid border-t border-black">
                {parse(profile.my_info)}
              </div>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  </div>
  );
}

export default ProfileWrapper;