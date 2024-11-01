import { PrevState } from '@/types/email/formData';

const MailField = ({
  success,
  message,
  option,
}: PrevState): React.ReactElement => {
  return (
    <div className="mb-4">
      <label
        htmlFor="email"
        className={`mb-2 block text-sm font-medium text-gray-600 ${
          (success === false &&
            (message === '必須項目を入力して下さい' ||
              message === 'メールアドレスを確認して下さい' ||
              message === '名前とメールアドレス項目を入力して下さい' ||
              message === 'メールアドレスと内容を入力して下さい' ||
              message === 'メールアドレスに問題があります')) ||
          option === 'email'
            ? 'text-red-600'
            : ''
        }`}
      >
        Email
        <span className="mx-2 inline-block rounded-xl bg-skyblue p-1 text-[10px] leading-3 text-white">
          必須
        </span>
        <span
          className={`mx-2 inline-block text-[10px] leading-3 ${
            success === false && message === 'メールアドレスに問題があります'
              ? 'text-red-600'
              : ''
          }`}
        >
          {success === false && message === 'メールアドレスに問題があります'
            ? message
            : null}
        </span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
        disabled={success && message === 'お問い合わせを受け付けました'}
      />
    </div>
  );
};

export default MailField;
