'use client';
import { createContactData } from '@/app/_action/contact';
import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  success: true,
  option: '',
  message: '',
};

const SubmitButton = () => {
  // 初期値false
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-32 rounded-lg bg-skyblue px-7 py-2 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
      disabled={pending}
    >
      {pending ? '送信中' : '送信'}
    </button>
  );
};

const ContactWrapper = (): React.ReactElement => {
  const [formState, formAction] = useFormState(createContactData, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  if (
    formState.success &&
    formState.message === 'お問い合わせを受け付けました'
  ) {
    formRef.current?.reset();
  }

  return (
    <div className="mx-auto w-full max-w-[410px] pb-20 pt-14">
      <form action={formAction} ref={formRef}>
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
          <SubmitButton />
          {/* <button
            type="submit"
            className="w-32 rounded-lg bg-skyblue px-7 py-2 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
            disabled={
              formState.success &&
              formState.message === 'お問い合わせを受け付けました'
            }
          >
            {formState.success &&
            formState.message === 'お問い合わせを受け付けました'
              ? '送信完了'
              : '送信'}
          </button> */}
        </div>

        <p
          className={`mt-4 flex justify-center ${formState.success === false ? 'text-red-600' : ''}`}
        >
          {formState.success === false
            ? '必須項目を入力して下さい'
            : formState.message}
        </p>
      </form>
    </div>
  );
};

export default ContactWrapper;
