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
  try {
    const domain = new URL(url).hostname;
    const defaultFavicon = new URL('/favicon.ico', url).toString();

    // YouTube/Udemy用の特別なハンドリング
    if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
      return handleYouTubeOgp(url, domain);
    }
    
    if (domain.includes('udemy.com')) {
      return handleUdemyOgp(url, domain);
    }

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
      console.error(`Error fetching OGP for ${url}:`, error);
      return {
        title: '',
        image: '',
        domain,
        url,
        favicon: defaultFavicon,
      };
    }
  } catch (error) {
    // Invalid URL の場合は空のデータを返す
    return {
      title: '',
      image: '',
      domain: '',
      url,
      favicon: '',
    };
  }
}

async function handleYouTubeOgp(url: string, domain: string): Promise<OgpResult> {
  const videoId = extractYouTubeVideoId(url);
  
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title || 'YouTube Video',
        image: data.thumbnail_url || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : ''),
        domain,
        url,
        favicon: 'https://www.youtube.com/favicon.ico',
      };
    }
  } catch (error) {
    console.error(`YouTube oEmbed failed for ${url}:`, error);
  }
  
  return {
    title: 'YouTube Video',
    image: videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '',
    domain,
    url,
    favicon: 'https://www.youtube.com/favicon.ico',
  };
}

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

function handleUdemyOgp(url: string, domain: string): OgpResult {
  const courseSlug = extractUdemyCourseSlug(url);
  const title = courseSlug 
    ? courseSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Udemy Course';
  
  return {
    title: `${title} - Udemy`,
    image: '',
    domain,
    url,
    favicon: 'https://www.udemy.com/staticx/udemy/images/v7/favicon.ico',
  };
}

function extractUdemyCourseSlug(url: string): string | null {
  const match = url.match(/udemy\.com\/course\/([^/?]+)/);
  return match ? match[1] : null;
}