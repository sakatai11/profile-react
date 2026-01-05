/**
 * バリデーション関連のユーティリティ関数
 */

/**
 * メールアドレスのバリデーション
 * @param email - 検証するメールアドレス
 * @returns メールアドレスが有効な場合はtrue
 */
export function validateEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

/**
 * 半角・全角スペースを含む前後の空白を削除
 * @param str - トリムする文字列
 * @returns トリム後の文字列
 */
export function trimAll(str: string): string {
  return str.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
}
