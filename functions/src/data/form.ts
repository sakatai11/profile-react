export const defaultMessage = {
  successMessage: 'お問い合わせを受け付けました',
  errorMessage: '必須項目を入力して下さい',
} as const;

export const messageType = {
  name: '名前を入力してください',
  nameAndmail: '名前とメールアドレス項目を入力して下さい',
  nameAndcontent: '名前と内容を入力して下さい',
  mail: 'メールアドレスを確認して下さい',
  mailAndcontent: 'メールアドレスと内容を入力して下さい',
  addressError: 'メールアドレスに問題があります',
  content: '内容を入力して下さい',
} as const;

// Message 型定義
export type Message =
  | typeof defaultMessage.successMessage
  | typeof defaultMessage.errorMessage
  | typeof messageType.name
  | typeof messageType.nameAndmail
  | typeof messageType.nameAndcontent
  | typeof messageType.mail
  | typeof messageType.mailAndcontent
  | typeof messageType.addressError
  | typeof messageType.content;
