import * as Blog from "@/features/blog/conponents/Index"
import Section from "../components/layouts/common/Section";
import Title from "../components/elements/title/Index";

export default function BlogPage() {
  return (
    <Section>
      <Title text="Blog" />
      <Blog.BlogWrapper />
    </Section>
  );
}
