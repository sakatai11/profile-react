'use server';

type PrevState = unknown;

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
      status: 'error',
      message: '必須項目を入力して下さい',
    };
  } else if (
    !rawFormData.name &&
    (!rawFormData.email || !validateEmail(rawFormData.email))
  ) {
    return {
      status: 'error',
      message: '名前とメールアドレス項目を入力して下さい',
    };
  } else if (
    !rawFormData.name &&
    (!rawFormData.content || !validateEmail(rawFormData.email))
  ) {
    return {
      status: 'error',
      message: '名前と内容を入力して下さい',
    };
  } else if (
    (!rawFormData.email || !validateEmail(rawFormData.email)) &&
    !rawFormData.content
  ) {
    return {
      status: 'error',
      message: 'メールアドレスと内容を入力して下さい',
    };
  }

  if (!rawFormData.name) {
    return {
      status: 'error',
      option: 'name',
      message: '名前を入力してください',
    };
  }

  if (!rawFormData.email) {
    return {
      status: 'error',
      option: 'email',
      message: 'メールアドレスを確認して下さい',
    };
  } else if (!validateEmail(rawFormData.email)) {
    return {
      status: 'error',
      option: 'email',
      message: 'メールアドレスに問題があります',
    };
  }

  if (!rawFormData.content) {
    return {
      status: 'error',
      option: 'content',
      message: '内容を入力して下さい',
    };
  }

  // const result = await fetch(
  //   `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fields: [
  //         {
  //           objectTypeId: "0-1",
  //           name: "name",
  //           value: rawFormData.name,
  //         },
  //         {
  //           objectTypeId: "0-1",
  //           name: "email",
  //           value: rawFormData.email,
  //         },
  //         {
  //           objectTypeId: "0-1",
  //           name: "contact",
  //           value: rawFormData.content,
  //         },
  //       ],
  //     }),
  //   }
  // );

  // try {
  //   await result.json();
  // } catch (e) {
  //   console.log(e);
  //   return {
  //     status: "error",
  //     message: "お問い合わせに失敗しました",
  //   };
  // }

  return { status: 'success', message: 'お問い合わせを受け付けました。' };
}
