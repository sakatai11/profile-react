import { FormData } from '@/types/email/formData';

export const EmailMeTemplate = ({ name, email, content }: FormData) => (
  <p>
    お名前：{name}
    <br />
    メールアドレス：{email}
    <br />
    内容：{content}
  </p>
);
