type PendingProps = {
  isPending: boolean;
};

const SendButton = ({ isPending }: PendingProps): React.ReactElement => {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="submit"
        className="w-32 rounded-lg bg-skyblue px-7 py-2 text-center text-white opacity-100 duration-500 hover:opacity-70 hover:duration-500"
        disabled={isPending}
      >
        {isPending ? '送信中' : '送信'}
      </button>
    </div>
  );
};

export default SendButton;
