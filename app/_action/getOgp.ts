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

  // YouTube/Udemy用の特別なハンドリング
  if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
    return handleYouTubeOgp(url, domain, defaultFavicon);
  }
  
  if (domain.includes('udemy.com')) {
    return handleUdemyOgp(url, domain, defaultFavicon);
  }

  try {
    console.log(`Fetching OGP for: ${url}`);
    const { result } = await ogs({ 
      url,
      fetchOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate'
        }
      },
      timeout: 15000
    });
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
}

async function handleYouTubeOgp(url: string, domain: string, defaultFavicon: string): Promise<OgpResult> {
  try {
    // YouTube Video IDを抽出
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
      // YouTube APIまたは直接的な方法でタイトルを取得
      const title = `YouTube Video - ${videoId}`;
      const image = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const favicon = 'https://www.youtube.com/favicon.ico';
      
      return { title, image, domain, url, favicon };
    }
  } catch (error) {
    console.error(`Error handling YouTube OGP for ${url}:`, error);
  }
  
  return {
    title: 'YouTube Video',
    image: '',
    domain,
    url,
    favicon: defaultFavicon,
  };
}

async function handleUdemyOgp(url: string, domain: string, defaultFavicon: string): Promise<OgpResult> {
  try {
    // Udemyの場合は基本情報のみ返す
    return {
      title: 'Udemy Course',
      image: '',
      domain,
      url,
      favicon: 'https://www.udemy.com/staticx/udemy/images/v7/favicon.ico',
    };
  } catch (error) {
    console.error(`Error handling Udemy OGP for ${url}:`, error);
  }
  
  return {
    title: 'Udemy Course',
    image: '',
    domain,
    url,
    favicon: defaultFavicon,
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
