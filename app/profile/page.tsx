import { microCMSClient } from "@/libs/microcms";
import { ProfileContents } from "@/types/cms/profile";
import Section from "../components/layouts/common/Section";
import Title from "../components/elements/title/Index";
import * as Profile from "@/features/profile/conponents/Index" 

export default async function ProfilePage() {
  // プロフィールの取得
  const getProfile = async () => {
    const result = await microCMSClient.getList<ProfileContents>({
      customRequestInit: {
      cache: "force-cache", // キャッシュ内でデータを取得する（SSG）
      },
      endpoint: "profile",
    });

    return {
      props: result.contents,
    };
  }

  const { props } = await getProfile();

  return (
    <Section>
      <Title text={'Profile'} />
      <Profile.ProfileWrapper contents={ props }/>
    </Section>
  );
}
