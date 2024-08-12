type ImageProps = {
  src: string;
  width: number;
  quality: number;
};

export default function imgixLoader({ src, width, quality }: ImageProps) {
  // src に 'images.microcms-assets.io' が含まれている場合は無視する
  if (src.includes('images.microcms-assets.io')) {
    return src;
  }

  const url = new URL(`https://saka-tai.com${src}`);
  const params = url.searchParams;
  params.set('auto', params.getAll('auto').join(',') || 'format');
  params.set('fit', params.get('fit') || 'max');
  params.set('w', params.get('w') || width.toString());
  params.set('q', (quality || 50).toString());
  params.set('fm', 'webp');
  return url.href;
}
