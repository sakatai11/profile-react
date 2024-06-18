import { getProfile } from "@/libs/microcms";
import ProfileMain from "@/features/profile/conponents/ProfileMain";

export default async function ProfilePage() {
  const { props } = await getProfile();

  return (
    <ProfileMain contents={ props } />
  );
}
