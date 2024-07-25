// import { ProfileContents } from "@/types/cms/profile";
'use client';
import { createContactData } from '@/app/_action/contact';
import { useFormState } from 'react-dom';

const initialState = {
  status: '',
  message: '',
};

const ContactWrapper = (): JSX.Element => {
  const [formState, formAction] = useFormState(createContactData, initialState);

  console.log(formState);

  return (
    <div className="mx-auto w-full max-w-[410px] pb-20 pt-14">
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className={`block text-sm font-medium text-gray-600 ${formState.status === 'error' ? 'text-red-600' : ''}`}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`mt-1 w-full rounded-md border p-2 ${formState.status === 'error' ? 'outline outline-red-600' : ''}`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            // required
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            // required
            className="mt-1 w-full rounded-md border p-2"
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
          {formState.message}
        </p>
      </form>
    </div>
  );
};

export default ContactWrapper;
