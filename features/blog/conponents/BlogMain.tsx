import Title from "@/app/components/elements/title/Index";

type BlogMainProps = {
  text: string;
}

const BlogMain = ({text}:BlogMainProps): JSX.Element => {
  return (
    <section>
      <div className="container">
        <Title text={text} />
        <div className="w-full">
          
        </div>
      </div>
    </section>
  );
}

export default BlogMain;