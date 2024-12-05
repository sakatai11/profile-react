'use server';
import { EmailTemplate } from '@/app/_components/email/EmailTemplate';
import { EmailMeTemplate } from '@/app/_components/email/EmailMeTemplate';
import { revalidatePath } from 'next/cache';
import { PrevState } from '@/types/email/formData';
import { defaultMessage, messageType } from '@/data/form';
import { sendMessage } from '@/data/accounts';
import { Resend } from 'resend';
import * as React from 'react';
// import { db } from '@/app/utils/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

function validateEmail(email: string) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|jp|net|to|cx)$/;
  return pattern.test(email);
}

export async function createContactData(
  _prevState: PrevState,
  formData: FormData,
) {
  // formのname属性ごとにformData.get()で値を取り出す
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    content: formData.get('content') as string,
    // timestamp: serverTimestamp(),
  };

  if (
    !rawFormData.name &&
    (!rawFormData.email || !validateEmail(rawFormData.email)) &&
    !rawFormData.content
  ) {
    return {
      success: false,
      message: defaultMessage.errorMessage,
    };
  }

  if (
    !rawFormData.name &&
    (!rawFormData.email || !validateEmail(rawFormData.email))
  ) {
    return {
      success: false,
      message: messageType.nameAndmail,
    };
  }

  if (
    !rawFormData.name &&
    (!rawFormData.content || !validateEmail(rawFormData.email))
  ) {
    return {
      success: false,
      message: messageType.nameAndcontent,
    };
  }

  if (
    (!rawFormData.email || !validateEmail(rawFormData.email)) &&
    !rawFormData.content
  ) {
    return {
      success: false,
      message: messageType.mailAndcontent,
    };
  }

  if (!rawFormData.name) {
    return {
      success: false,
      option: 'name',
      message: messageType.name,
    };
  }

  if (!rawFormData.email) {
    return {
      success: false,
      option: 'email',
      message: messageType.mail,
    };
  } else if (!validateEmail(rawFormData.email)) {
    return {
      success: false,
      option: 'email',
      message: messageType.addressError,
    };
  }

  if (!rawFormData.content) {
    return {
      success: false,
      option: 'content',
      message: messageType.content,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // await addDoc(collection(db, 'contacts'), rawFormData);
    const emailSendResults = [
      await resend.emails.send({
        from: sendMessage.form,
        to: [rawFormData.email],
        subject: sendMessage.subject,
        react: EmailTemplate(rawFormData) as React.ReactElement,
      }),
      await resend.emails.send({
        from: sendMessage.form,
        to: [process.env.ADDRESS as string],
        subject: sendMessage.meSubject,
        react: EmailMeTemplate(rawFormData) as React.ReactElement,
      }),
    ];

    for (const result of emailSendResults) {
      if (result.error) {
        throw new Error(result.error.message || 'Unknown error occurred');
      }
    }
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.error('FirebaseError:', e.code, e.message);
    } else {
      console.error('Error adding document:', e);
    }
    return {
      success: false,
      message: sendMessage.error,
    };
  }

  // Cacheの再検証
  revalidatePath('/contact');

  return { success: true, message: sendMessage.success };
}
