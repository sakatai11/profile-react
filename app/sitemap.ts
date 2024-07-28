import { MetadataRoute } from 'next';
import { getCategory } from '@/libs/microcms';
import { pageLinks } from '@/data/links';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.SERVER_DOMAIN || '';

  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: baseURL,
      lastModified: new Date(),
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = pageLinks.map((page) => ({
    url: `${baseURL}/${page.href}`,
    lastModified: new Date(),
  }));

  const { categories } = await getCategory();

  const blogPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseURL}/blog/${category.id}`,
    lastModified: category.publishedAt
      ? new Date(category.publishedAt)
      : new Date(),
  }));

  return [...defaultPages, ...dynamicPages, ...blogPages];
}
