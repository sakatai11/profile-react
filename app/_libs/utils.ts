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

export const secureCompare = (apiKey: string) => {
  console.log('api:', apiKey);
  console.log('Env Variable:', process.env.X_MICROCMS_SIGNATURE);
  if (
    typeof apiKey !== 'string' ||
    typeof process.env.X_MICROCMS_SIGNATURE !== 'string'
  ) {
    console.error('API Key or Environment Variable is not a string');
    return false;
  }
  const bufferA = Buffer.from(apiKey, 'utf8');
  const bufferB = Buffer.from(process.env.X_MICROCMS_SIGNATURE, 'utf8');

  if (bufferA.length !== bufferB.length) {
    console.error('Buffer lengths do not match');
    return false;
  }

  let result = 0;
  for (let i = 0; i < bufferA.length; i++) {
    result |= bufferA[i] ^ bufferB[i];
  }
  return result === 0;
};
