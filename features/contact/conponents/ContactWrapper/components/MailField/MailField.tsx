import { PrevState } from '@/types/email/formData';
import { defaultMessage, messageType } from '@/data/form';

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
            (message === defaultMessage.errorMessage ||
              message === messageType.mail ||
              message === messageType.nameAndmail ||
              message === messageType.mailAndcontent ||
              message === messageType.addressError)) ||
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
            (success === false &&
              (message === defaultMessage.errorMessage ||
                message === messageType.mail ||
                message === messageType.nameAndmail ||
                message === messageType.mailAndcontent ||
                message === messageType.addressError)) ||
            option === 'email'
              ? 'text-red-600'
              : ''
          }`}
        >
          {(success === false &&
            (message === defaultMessage.errorMessage ||
              message === messageType.mail ||
              message === messageType.nameAndmail ||
              message === messageType.mailAndcontent ||
              message === messageType.addressError)) ||
          option === 'email'
            ? message === messageType.mail
              ? messageType.mail
              : message === messageType.addressError
                ? messageType.addressError
                : messageType.mail
            : null}
        </span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className={'mt-1 w-full rounded-md border bg-[#F3F7FB] p-2'}
        disabled={success && message === defaultMessage.successMessage}
      />
    </div>
  );
};

export default MailField;
