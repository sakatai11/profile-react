import { getProfile } from '../_libs/microcms';
import type { Metadata } from 'next';
import { profileSite } from '@/data/site';
import MotionWrapper from '../_components/motion/motionWrapper';
import Title from '../_components/elements/title/Index';
import * as Profile from '@/features/profile/conponents/Index';

export const metadata: Metadata = {
  title: profileSite.title,
  description: profileSite.description,
};

export default async function ProfilePage() {
  // プロフィールの取得
  const { props } = await getProfile();

  return (
    <>
      <Title text={'Profile'} />
      <MotionWrapper>
        <Profile.ProfileWrapper contents={props} />
      </MotionWrapper>
    </>
  );
}
