import crypto from 'crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // API Keyの検証
  const apiKey =
    request.headers.get('X-MICROCMS-Signature') ||
    request.headers.get('x-microcms-signature');
  const secret = process.env.X_MICROCMS_SIGNATURE;

  if (!apiKey || !secret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.text(); // リクエストボディを取得
  const hash = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (apiKey !== hash) {
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
