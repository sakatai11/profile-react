'use server';

import ogs from 'open-graph-scraper';

export type OgpResult = {
  title: string;
  image: string;
  domain: string;
  url: string;
  favicon: string;
};

export async function getOgp(url: string): Promise<OgpResult> {
  const domain = new URL(url).hostname;
  const defaultFavicon = new URL('/favicon.ico', url).toString();

  try {
    const { result } = await ogs({ url });
    const title = (result.ogTitle as string) ?? '';
    const image =
      Array.isArray(result.ogImage) && result.ogImage.length > 0
        ? (result.ogImage[0].url as string)
        : typeof result.ogImage === 'object' && 'url' in result.ogImage
          ? (result.ogImage.url as string)
          : '';
    let favicon = defaultFavicon;
    if ('favicon' in result) {
      const raw =
        Array.isArray(result.favicon) && result.favicon.length > 0
          ? (result.favicon[0] as string)
          : typeof result.favicon === 'string'
            ? result.favicon
            : null;
      if (raw) {
        favicon = raw.startsWith('http') ? raw : new URL(raw, url).toString();
      }
    }

    return { title, image, domain, url, favicon };
  } catch (error) {
    return {
      title: '',
      image: '',
      domain,
      url,
      favicon: defaultFavicon,
    };
  }
}
