import { FormData } from '@/types/email/formData';

export const EmailTemplate = ({ name, email, content }: FormData) => (
  <div>
    <p>{name} さま</p>
    <p>
      この度は、当サイトにお問い合わせいただき、誠にありがとうございます。
      <br />
      以下の内容でお問い合わせを受け付けました。
    </p>
    <p>------------------------------------</p>
    <p>
      お名前：{name}
      <br />
      メールアドレス：{email}
      <br />
      内容：{content}
    </p>
    <p>------------------------------------</p>
    <p>
      なお、本メールは自動送信されたものですので、返信いただいてもご対応できかねます。
      <br />
      お問い合わせの内容に応じて、担当者より改めてご連絡いたしますので、今しばらくお待ちください。
    </p>
    <p>何卒よろしくお願い致します。</p>
    <p>------------------------------------</p>
    <p>
      ■さかのパーソナルサイト
      <br />
      <a href="https://www.saka-tai.com/">https://www.saka-tai.com/</a>
    </p>
    <p>
      ■お問い合わせ
      <br />
      <a href="mailto:support&#64;saka-tai.com">support&#64;saka-tai.com</a>
    </p>
  </div>
);
