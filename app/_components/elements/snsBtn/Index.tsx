import { shareLinks } from '@/data/share';
import Link from 'next/link';
import Image from 'next/image';
import { commonTwitterOpenGraph } from '@/data/twitter';

type SnsProps = {
  url: string;
  title: string;
};

const SnsBtn = ({ url, title }: SnsProps): React.ReactElement => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const accountName = commonTwitterOpenGraph.site.replace(/^@/, '');

  // 事前に分岐処理を行う
  const processedLinks = shareLinks.map((shareLink) => {
    let href = `${shareLink.url}${encodedUrl}`;
    if (shareLink.alt === 'X-icon') {
      href += `%0a%0a&text=${encodedTitle}%0a&via=${accountName}`;
    } else if (shareLink.alt !== 'facebook-icon') {
      href += `&text=${encodedTitle}`;
    }
    return {
      ...shareLink,
      href, // 生成した新しいオブジェクトを追加
    };
  });

  return (
    <>
      {processedLinks.map((shareLink) => (
        <li key={shareLink.alt}>
          <Link href={shareLink.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={shareLink.src}
              width={35}
              height={35}
              alt={shareLink.alt}
              sizes="{max-width: 767px} 100vw, 50vw"
              priority={true}
            />
          </Link>
        </li>
      ))}
    </>
  );
};

export default SnsBtn;
