import { secureCompare } from '@/app/_libs/utils';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // API Keyの検証
  const apiKey =
    request.headers.get('X-MICROCMS-Signature') ||
    request.headers.get('x-microcms-signature');
  if (!apiKey || !secureCompare(apiKey)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Cacheの再検証
  const tag = request.nextUrl.searchParams.get('tag');
  if (!tag) {
    return NextResponse.json({ message: 'No tag provided' }, { status: 400 });
  }
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
