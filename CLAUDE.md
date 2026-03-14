# CLAUDE.md

## コマンド

```bash
npm run dev       # 開発サーバー起動 (localhost:3000)
npm run build     # プロダクションビルド（fetch-cache を自動削除）
npm run format    # Prettier + ESLint 自動修正
npm run lint      # ESLint のみ（eslint --fix .）
```

### Firebase Functions（独立パッケージ）

```bash
cd functions
npm run build     # TypeScript コンパイル
npm run deploy    # Firebase にデプロイ
npm run serve     # ローカルエミュレーター起動
```

## アーキテクチャ

```text
app/              # Next.js App Router
  _action/        # Server Actions (contact, OGP取得)
  _components/    # 共有UIコンポーネント
  _libs/          # アプリレベルユーティリティ
  api/revalidate/ # ISR 再検証 API
  article/ blog/ contact/ profile/  # ページルート
features/         # ページ単位の機能モジュール（UI + ロジック）
data/             # 定数・設定（リンク、サイト情報、SNSアカウント等）
types/            # TypeScript 型定義（cms / email / ogp）
functions/        # Firebase Cloud Functions（独立 npm パッケージ、個別に npm install が必要）
public/           # 静的アセット
```

## 注意点・Gotcha

### Turbopack（Next.js 16）
Next.js 16 から Turbopack がデフォルト有効。問題が発生した場合は `next dev --no-turbopack` で無効化。

### Tailwind ブレークポイント
`sm` / `md` / `tb` はすべて **max-width**（デスクトップファースト）。
通常の Tailwind（min-width）と逆なので注意。

```ts
sm: { max: '560px' }
md: { max: '768px' }
tb: { max: '960px' }
```

### ビルド時の fetch-cache 削除
`npm run build` は内部で `rm -rf .next/cache/fetch-cache` を実行してから
Next.js をビルドする。キャッシュ問題が発生した場合も同様に対処。

### ESLint（Flat Config）
ESLint 9 に移行済み。設定ファイルは `eslint.config.mjs`（`.eslintrc.json` / `.eslintignore` は削除済み）。
`next lint` は廃止されたため `eslint --fix .` を使用。

### revalidateTag の第2引数
Next.js 16 から `revalidateTag(tag, 'max')` のように第2引数が必須になった。

### 外部サービス連携
- **microCMS**: ブログ・記事コンテンツの CMS
- **Resend**: お問い合わせフォームのメール送信
- **Firebase Functions**: Google Analytics データ取得等のバックエンド処理

## 環境変数

`.env.local` に以下を設定（Firebase は `functions/.env` または Firebase コンソールで管理）：

```env
MICROCMS_API_KEY=
MICROCMS_SERVICE_DOMAIN=
RESEND_API_KEY=
```
