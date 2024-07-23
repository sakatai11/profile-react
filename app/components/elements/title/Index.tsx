type Props = {
  text: string;
};

const Title = ({ text }: Props): JSX.Element => (
  <div className="flex w-auto flex-col items-center">
    <h1 className="h1Tit text-center font-spartan font-normal">{text}</h1>
  </div>
);

export default Title;
