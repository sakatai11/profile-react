'use server';

import ogs from 'open-graph-scraper';
import { OgpResult } from '@/types/ogp/seoOgp';

export async function getOgp(url: string): Promise<OgpResult> {
  try {
    const { result } = await ogs({ url });
    return {
      title: (result.ogTitle as string) ?? '',
      image:
        Array.isArray(result.ogImage) && result.ogImage.length > 0
          ? (result.ogImage[0].url as string)
          : typeof result.ogImage === 'object' && 'url' in result.ogImage
          ? (result.ogImage.url as string)
          : '',
      domain: new URL(url).hostname,
      url,
    };
  } catch (error) {
    return {
      title: '',
      image: '',
      domain: '',
      url,
    };
  }
}
