// import { ProfileContents } from "@/types/cms/profile";
'use client';
import { createContactData } from '@/app/_action/contact';
import { useFormState } from 'react-dom';

const initialState = {
  status: '',
  option: '',
  message: '',
  // errors: {
  //   name: '',
  //   email: '',
  //   content: '',
  // },
};

const ContactWrapper = (): JSX.Element => {
  const [formState, formAction] = useFormState(createContactData, initialState);

  console.log(formState.message);

  return (
    <div className="mx-auto w-full max-w-[410px] pb-20 pt-14">
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className={`mb-2 block text-sm font-medium text-gray-600 ${
              (formState.status === 'error' &&
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
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className={`mb-2 block text-sm font-medium text-gray-600 ${
              (formState.status === 'error' &&
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
                formState.status === 'error' &&
                formState.message === 'メールアドレスに問題があります'
                  ? 'text-red-600'
                  : ''
              }`}
            >
              {formState.status === 'error' &&
              formState.message === 'メールアドレスに問題があります'
                ? formState.message
                : null}
            </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            // required
            className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className={`mb-2 block text-sm font-medium text-gray-600 ${
              (formState.status === 'error' &&
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
            // required
            className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
          ></textarea>
        </div>
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="rounded-lg bg-skyblue px-8 py-2 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
          >
            送信
          </button>
        </div>

        <p
          className={`mt-4 flex justify-center ${formState.status === 'error' ? 'text-red-600' : ''}`}
        >
          {formState.status === 'error'
            ? '必須項目を入力して下さい'
            : formState.message}
        </p>
      </form>
    </div>
  );
};

export default ContactWrapper;
