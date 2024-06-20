import { ProfileContents } from "@/types/cms/profile";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import illustration from "/public/illustration.png";
import linkIcon from "/public/link-icon.svg";
import React from "react";

type ProfileMainProps = {
  contents: ProfileContents[];
};

const ProfileMain = ({contents}: ProfileMainProps):JSX.Element => {
  console.log(contents);

  return (
  <section>
    <div className="container">
      <div className="flex flex-col items-center w-auto">
        <h1 className="font-spartan h1Tit text-center">Profile</h1>
      </div>
      <div className="w-full mt-28">
        <div className="flex justify-center gap-24 w-9/12 m-auto">
          <div className="flex-1 mt-4">
            <Image 
              src={illustration}
              height={260}
              width={260}
              alt="イラスト"
              className="m-auto"
              />
          </div>
          <div className="flex-1">
            {
              contents.map((profile) => (
                <React.Fragment key={profile.id}>
                  <div className="pb-[30px]">
                    <p className="text-2xl mb-2">{profile.name}</p>
                    <p className="relative pl-5 text-xs">
                      <span className="absolute top-0 left-0 flex items-center h-full"><Image src={linkIcon} height={16} width={16} alt="アイコン" /></span>
                      <Link href={profile.url} rel="noopener noreferrer" target="_blank">{profile.url}</Link>
                    </p>
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
    </div>
  </section>
  );
}

export default ProfileMain;