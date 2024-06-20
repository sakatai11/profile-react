type Props = {
  text: string;
};

const Title = ({ text }: Props): JSX.Element => (
  <div className="flex flex-col items-center w-auto">
  <h1 className="font-spartan h1Tit text-center">{text}</h1>
</div>
);

export default Title;