'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { createContactData } from '@/app/_action/contact';
import { useRef, useEffect, useActionState, startTransition } from 'react';
import { PrevState } from '@/types/email/formData';

// 初期値
const initialState = {
  success: false,
  option: '',
  message: '',
};

const ContactWrapper = () => {
  const [formState, formAction, isPending] = useActionState(
    async (_prevState: PrevState, formData: FormData) => {
      const { success, option, message } = await createContactData(
        _prevState,
        formData,
      );
      return { success, option, message };
    },
    initialState,
  ); // 第2引数に初期値を指定

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendGTMEvent({ event: 'contact', value: 'submit' });

    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => {
      formAction(formData);
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  // successがtrueになったらフォームをリセット
  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
    }
  }, [formState.success]);

  return (
    <div className="mx-auto w-full max-w-[410px] pb-20 pt-14">
      <form action={formAction} onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className={`mb-2 block text-sm font-medium text-gray-600 ${
              (formState.success === false &&
                (formState.message === '必須項目を入力して下さい' ||
                  formState.message === '名前を入力して下さい' ||
                  formState.message ===
                    '名前とメールアドレス項目を入力して下さい' ||
                  formState.message === '名前と内容を入力して下さい')) ||
              formState.option === 'name'
                ? 'text-red-600'
                : ''
            }`}
          >
            Name
            <span className="mx-2 inline-block rounded-xl bg-skyblue p-1 text-[10px] leading-3 text-white">
              必須
            </span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
            disabled={
              formState.success &&
              formState.message === 'お問い合わせを受け付けました'
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`mb-2 block text-sm font-medium text-gray-600 ${
              (formState.success === false &&
                (formState.message === '必須項目を入力して下さい' ||
                  formState.message === 'メールアドレスを確認して下さい' ||
                  formState.message ===
                    '名前とメールアドレス項目を入力して下さい' ||
                  formState.message ===
                    'メールアドレスと内容を入力して下さい' ||
                  formState.message === 'メールアドレスに問題があります')) ||
              formState.option === 'email'
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
                formState.success === false &&
                formState.message === 'メールアドレスに問題があります'
                  ? 'text-red-600'
                  : ''
              }`}
            >
              {formState.success === false &&
              formState.message === 'メールアドレスに問題があります'
                ? formState.message
                : null}
            </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
            disabled={
              formState.success &&
              formState.message === 'お問い合わせを受け付けました'
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className={`mb-2 block text-sm font-medium text-gray-600 ${
              (formState.success === false &&
                (formState.message === '必須項目を入力して下さい' ||
                  formState.message === '内容を入力して下さい' ||
                  formState.message === '名前と内容を入力して下さい' ||
                  formState.message ===
                    'メールアドレスと内容を入力して下さい')) ||
              formState.option === 'content'
                ? 'text-red-600'
                : ''
            }`}
          >
            Content
            <span className="mx-2 inline-block rounded-xl bg-skyblue p-1 text-[10px] leading-3 text-white">
              必須
            </span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
            disabled={
              formState.success &&
              formState.message === 'お問い合わせを受け付けました'
            }
          ></textarea>
        </div>
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="w-32 rounded-lg bg-skyblue px-7 py-2 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
            disabled={isPending}
          >
            {isPending ? '送信中' : '送信'}
          </button>
        </div>

        <p
          className={`mt-4 flex justify-center ${formState.success === false ? 'text-red-600' : ''}`}
        >
          {formState.success === false && formState.message
            ? '必須項目を入力して下さい'
            : formState.message}
        </p>
      </form>
    </div>
  );
};

export default ContactWrapper;
