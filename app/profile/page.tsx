import { getProfile } from "@/libs/microcms";
import MotionWrapper from "../components/motion/motionWrapper";
import Title from "../components/elements/title/Index";
import * as Profile from "@/features/profile/conponents/Index" 

export default async function ProfilePage() {
  // プロフィールの取得
  const { props } = await getProfile();

  return (
    <>
      <Title text={'Profile'} />
        <MotionWrapper>
          <Profile.ProfileWrapper contents={ props }/>
        </MotionWrapper>
    </>
  );
}
