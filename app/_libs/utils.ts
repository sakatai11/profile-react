import { TocProps } from '@/types/cms/toc';
import * as cheerio from 'cheerio';

export const createTableOfContents = (richText: string): TocProps[] => {
  const $ = cheerio.load(richText);
  const headings = $('h2, h3').toArray();
  const tableOfContents: TocProps[] = headings
    .map((heading) => {
      if (heading.type === 'tag') {
        const id = heading.attribs.id;
        const name = heading.name;
        const text = $(heading).text();
        return { id, name, text };
      }
      return undefined;
    })
    .filter((item): item is TocProps => item !== undefined); // `undefined` を除外
  return tableOfContents;
};

export const secureCompare = (a: string, b: string) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < bufferA.length; i++) {
    result |= bufferA[i] ^ bufferB[i];
  }

  return result === 0;
};
