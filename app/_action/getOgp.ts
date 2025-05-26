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
      if (Array.isArray(result.favicon) && result.favicon.length > 0) {
        favicon = result.favicon[0] as string;
      } else if (typeof result.favicon === 'string') {
        favicon = result.favicon;
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
