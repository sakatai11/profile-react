# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**必ず日本語で回答してください**

## プロジェクト概要

Next.js 15 + microCMS + Tailwind CSS + Firebaseを使用したポートフォリオ/ブログサイト（https://www.saka-tai.com）

### 技術スタック

- **フレームワーク**: Next.js 15 (App Router、Turbopack使用)
- **言語**: TypeScript (strict mode)
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS (ブログ記事、プロフィール管理)
- **データベース**: Firebase Firestore (お問い合わせデータ保存)
- **メール送信**: Resend
- **デプロイ**: Vercel

## 開発コマンド

```bash
# 開発サーバー起動 (Turbopack使用)
npm run dev

# 本番ビルド (fetch-cache削除を含む)
npm run build

# 本番サーバー起動
npm start

# Lintとフォーマット実行
npm run format

# Lint修正のみ
npm run lint

# Prettierフォーマットのみ
npm run prettier
```

## アーキテクチャ

### ディレクトリ構造

```
/app
├── /_action          # Server Actions (contact.ts, getOgp.ts)
├── /_components      # 共通UIコンポーネント (elements, layouts, email)
├── /_libs            # ライブラリ設定 (microcms.ts, utils.ts)
├── /api              # APIルート (revalidate)
├── /article/[articleId]  # 記事詳細ページ
├── /blog             # ブログ一覧・カテゴリ別ページ
├── /contact          # お問い合わせページ
├── /profile          # プロフィールページ
├── /utils            # ユーティリティ (firebase.ts)
└── layout.tsx        # ルートレイアウト (force-static)

/features             # 機能別コンポーネント群 (article, blog, contact, profile, top, 404)
/types                # 型定義 (cms, email, ogp)
/data                 # 静的データ (site, ogp, twitter, form, accounts, links, share)
/public               # 静的アセット
```

### 重要な設計パターン

#### 1. レンダリング戦略

- **ルートレイアウト**: `force-static` (完全静的生成)
- **ブログ記事**: ISR (Incremental Static Regeneration) with `revalidate: 43200` (12時間)
- **キャッシュタグ**: `next: { tags: ['blog'] }` で記事のキャッシュ管理

#### 2. microCMS統合

- クライアント作成: `app/_libs/microcms.ts`
- 主要な取得関数:
  - `getProfile()`: プロフィール取得 (force-cache)
  - `getBlogArticle()`: ブログ記事一覧取得 (tags: ['blog'])
  - `getCategory()`: カテゴリ取得 (revalidate: 43200)
  - `getBlogArticleDetail()`: 記事詳細取得 (tags: ['blog'])

#### 3. Server Actions

- **お問い合わせ処理** (`app/_action/contact.ts`):
  - バリデーション (メールアドレス形式チェック)
  - Firestore保存
  - Resendでメール送信 (ユーザー宛 + 管理者宛)
  - `revalidatePath('/contact')` でキャッシュ更新

- **OGP取得** (`app/_action/getOgp.ts`):
  - 外部URLのOGP情報取得

#### 4. 型システム

- 全てのCMSデータに型定義あり (`types/cms/`)
- フォーム関連の型定義 (`types/email/formData.ts`)
- OGP関連の型定義 (`types/ogp/seoOgp.ts`)

#### 5. 画像最適化

Next.js Image Componentの設定 (`next.config.mjs`):
- microCMS画像: `images.microcms-assets.io`
- YouTube サムネイル: `i.ytimg.com`

#### 6. features構造

機能ごとにコンポーネントを分離:
- `features/article/`: 記事表示 (TOC、カテゴリ、リッチエディター、シェアボタン)
- `features/blog/`: ブログ一覧 (カテゴリタブ、ページネーション)
- `features/contact/`: お問い合わせフォーム (フィールド、バリデーション)
- `features/profile/`: プロフィール表示
- `features/top/`: トップページ要素

#### 7. 共通コンポーネント

- `app/_components/elements/`: Button, Copy, Title, SnsBtn
- `app/_components/layouts/`: Header, Footer, Section
- `app/_components/email/`: EmailTemplate (Resend用)
- `app/_components/motion/`: Framer Motion ラッパー

## 環境変数

必要な環境変数 (`.env.local`):
- `SERVICE_DOMAIN`: microCMSサービスドメイン
- `API_KEY`: microCMS APIキー
- `RESEND_API_KEY`: Resend APIキー
- `ADDRESS`: 管理者メールアドレス
- Firebase設定変数 (`app/utils/firebase.ts`参照)

## 開発時の注意点

### コードスタイル

- パスエイリアス: `@/` = プロジェクトルート
- PrettierとESLintの設定あり (Tailwind CSS plugin含む)
- TypeScript strict mode有効

### ビルドプロセス

- ビルド時に `rm -rf .next/cache/fetch-cache` でfetchキャッシュをクリア
- 実験的機能: `staleTimes.dynamic: 30` (Next.js 15機能)

### キャッシュ戦略

- プロフィール: `force-cache` (永続的)
- カテゴリ: `revalidate: 43200` (12時間)
- ブログ記事: タグベース (`tags: ['blog']`) + APIルートで手動再検証可能

### コンポーネント命名

- featuresディレクトリ内は機能単位でフォルダ分割
- 各機能の `Index.tsx` または `Index.ts` でエクスポート集約
- コンポーネント名はディレクトリ名と同じPascalCase

### メタデータとSEO

- ルートレイアウトでデフォルトメタデータ設定 (`data/site.ts`, `data/ogp.ts`)
- 各ページで個別のメタデータ生成
- GoogleTagManager統合済み (`GTM-T8DCTR56`)
- sitemap.ts でサイトマップ自動生成
