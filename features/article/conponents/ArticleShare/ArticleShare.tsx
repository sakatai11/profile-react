import { shareLinks } from "@/data/share";
import { copyLink } from "@/data/share";
import Link from "next/link";
import Image from "next/image";
import Copy from "@/app/components/elements/copy/Index";

const ArticleShare = ():JSX.Element => {

  return (
    <section>
      <div className="mx-[12.5%] md:mx-0">
        <div className="py-14 border-t-2 border-[#CED1D9]">
        <h2 className="flex items-center w-fit font-medium mx-auto before:mr-4 before:bg-share-icon before:inline-block before:bg-no-repeat before:w-5 before:h-5 before:bg-contain before:align-middle">記事をシェア</h2>
          <ul className="flex items-center justify-center gap-14 md:gap-10 mt-14">
          {
            shareLinks.map((shareLink) => (
              <li key={shareLink.alt}>
                <Link href={"#"}>
                  <Image 
                    src={shareLink.src}
                    width={35}
                    height={35}
                    alt={shareLink.alt}
                  />
                </Link>
              </li>
            ))
          }
          <li className="relative">
            <Copy>
              <Image 
                src={copyLink.src}
                width={35}
                height={35}
                alt={copyLink.alt}
              />
            </Copy>
          </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ArticleShare;