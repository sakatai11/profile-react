type Children = {
  children: React.ReactNode
}


const Section = ({children}: Children): JSX.Element => {
  return (
    <section>
    <div className="container">
    {children}
    </div>
    </section>
  );
}

export default Section;