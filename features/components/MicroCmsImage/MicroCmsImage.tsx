import { MicroCMSImageProps } from '@/types/cms/microCmsImage';
import Image from 'next/image';
import dummy from '@/public/dummy.png';

export default function MicroCmsImage({
  src,
  width,
  height,
  option = 'q=30', // 圧縮率30%
  format = 'auto=format',
  alt,
  className,
}: MicroCMSImageProps): JSX.Element {
  return (
    <Image
      src={
        src
          ? `${src}?fm=webp&w=${width}&h=${height}&${option}&${format}`
          : dummy.src
      }
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={true}
    />
  );
}
