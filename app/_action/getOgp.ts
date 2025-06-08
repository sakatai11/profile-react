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
    return handleUdemyOgp(url, domain);
  }

  try {
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
    // YouTube oEmbed APIを使用してタイトルを取得
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (response.ok) {
      const data = await response.json();
      const videoId = extractYouTubeVideoId(url);
      
      return {
        title: data.title || 'YouTube Video',
        image: data.thumbnail_url || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : ''),
        domain,
        url,
        favicon: 'https://www.youtube.com/favicon.ico',
      };
    }
  } catch (error) {
    console.error(`Error handling YouTube oEmbed for ${url}:`, error);
  }
  
  // フォールバック: Video IDから基本情報を生成
  const videoId = extractYouTubeVideoId(url);
  if (videoId) {
    return {
      title: 'YouTube Video',
      image: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      domain,
      url,
      favicon: 'https://www.youtube.com/favicon.ico',
    };
  }
  
  return {
    title: 'YouTube Video',
    image: '',
    domain,
    url,
    favicon: defaultFavicon,
  };
}

async function handleUdemyOgp(url: string, domain: string): Promise<OgpResult> {
  try {
    // 実際にOGP情報を取得してみる
    const { result } = await ogs({ 
      url,
      fetchOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      },
      timeout: 10000
    });

    const title = (result.ogTitle as string) || generateTitleFromSlug(url);
    const image = Array.isArray(result.ogImage) && result.ogImage.length > 0
      ? (result.ogImage[0].url as string)
      : typeof result.ogImage === 'object' && 'url' in result.ogImage
        ? (result.ogImage.url as string)
        : '';

    return {
      title: title.includes('Udemy') ? title : `${title} - Udemy`,
      image,
      domain,
      url,
      favicon: 'https://www.udemy.com/staticx/udemy/images/v7/favicon.ico',
    };
  } catch (error) {
    console.log(`Udemy OGP fetch failed for ${url}, using fallback`);
    
    // フォールバック: URLから情報を推測
    const title = generateTitleFromSlug(url);
    return {
      title: `${title} - Udemy`,
      image: '',
      domain,
      url,
      favicon: 'https://www.udemy.com/staticx/udemy/images/v7/favicon.ico',
    };
  }
}

function generateTitleFromSlug(url: string): string {
  const courseSlug = extractUdemyCourseSlug(url);
  return courseSlug 
    ? courseSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Udemy Course';
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

function extractUdemyCourseSlug(url: string): string | null {
  const match = url.match(/udemy\.com\/course\/([^/?]+)/);
  return match ? match[1] : null;
}