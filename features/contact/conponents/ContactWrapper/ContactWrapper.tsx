'use client';
import * as Field from './components/Index';
import { sendGTMEvent } from '@next/third-parties/google';
import { createContactData } from '@/app/_action/contact';
import { useRef, useEffect, useActionState, startTransition } from 'react';
import { PrevState } from '@/types/email/formData';
import { Message } from '@/functions/src/data/form';
import { sendMessage } from '@/functions/src/data/accounts';

type validationMessage = Message | typeof sendMessage.error;

// 初期値
const initialState = {
  success: false,
  option: '',
  message: '',
};

const ContactWrapper = () => {
  const [formState, formAction, isPending] = useActionState(
    async (
      _prevState: PrevState,
      formData: FormData,
    ): Promise<{
      success: boolean;
      option: string;
      message: validationMessage;
    }> => {
      const { success, option, message } = await createContactData(
        _prevState,
        formData,
      );
      return { success, option: option ?? '', message };
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
        <Field.NameField
          success={formState.success}
          message={formState.message}
          option={formState.option}
        />
        <Field.MailField
          success={formState.success}
          message={formState.message}
          option={formState.option}
        />
        <Field.ContentField
          success={formState.success}
          message={formState.message}
          option={formState.option}
        />
        <Field.SendButton isPending={isPending} />
        <Field.ValidationCheck
          success={formState.success}
          message={formState.message}
        />
      </form>
    </div>
  );
};

export default ContactWrapper;
