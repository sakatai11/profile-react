import { getProfile } from "@/libs/microcms";
import ProfileMain from "@/features/profile/conponents/ProfileMain";

export default async function ProfilePage() {
  const {props : {contents}} = await getProfile();

  return (
    <ProfileMain contents={contents} />
  );
}
