'use server';

type PrevState = {
  success?: boolean;
  option?: string;
  message?: string;
};

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
  };

  if (
    !rawFormData.name &&
    (!rawFormData.email || !validateEmail(rawFormData.email)) &&
    !rawFormData.content
  ) {
    return {
      success: false,
      message: '必須項目を入力して下さい',
    };
  } else if (
    !rawFormData.name &&
    (!rawFormData.email || !validateEmail(rawFormData.email))
  ) {
    return {
      success: false,
      message: '名前とメールアドレス項目を入力して下さい',
    };
  } else if (
    !rawFormData.name &&
    (!rawFormData.content || !validateEmail(rawFormData.email))
  ) {
    return {
      success: false,
      message: '名前と内容を入力して下さい',
    };
  } else if (
    (!rawFormData.email || !validateEmail(rawFormData.email)) &&
    !rawFormData.content
  ) {
    return {
      success: false,
      message: 'メールアドレスと内容を入力して下さい',
    };
  }

  if (!rawFormData.name) {
    return {
      success: false,
      option: 'name',
      message: '名前を入力してください',
    };
  }

  if (!rawFormData.email) {
    return {
      success: false,
      option: 'email',
      message: 'メールアドレスを確認して下さい',
    };
  } else if (!validateEmail(rawFormData.email)) {
    return {
      success: false,
      option: 'email',
      message: 'メールアドレスに問題があります',
    };
  }

  if (!rawFormData.content) {
    return {
      success: false,
      option: 'content',
      message: '内容を入力して下さい',
    };
  }

  return { success: true, message: 'お問い合わせを受け付けました' };
}
