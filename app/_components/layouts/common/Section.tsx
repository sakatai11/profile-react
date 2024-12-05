type Children = {
  children: React.ReactNode;
};

const Section = ({ children }: Children): React.ReactElement => {
  return (
    <section>
      <div className="container">{children}</div>
    </section>
  );
};

export default Section;
