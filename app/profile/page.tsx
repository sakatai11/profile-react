import { getProfile } from "@/libs/microcms";
import Section from "../components/layouts/common/Section";
import Title from "../components/elements/title/Index";
import * as Profile from "@/features/profile/conponents/Index" 

export default async function ProfilePage() {
  const { props } = await getProfile();

  return (
    <Section>
      <Title text={'Profile'} />
      <Profile.ProfileWrapper contents={ props }/>
    </Section>
  );
}
