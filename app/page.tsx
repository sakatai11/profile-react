// SSG
export const dynamic = 'force-static';

import * as Top from '@/features/top/conponents/Index';
import MotionWrapper from './components/motion/motionWrapper';

export default function TopPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="flex w-full grow flex-col items-center justify-end">
        <MotionWrapper delay={0}>
          <Top.TopImg />
        </MotionWrapper>
        <MotionWrapper delay={0.2}>
          <Top.TopTitle />
        </MotionWrapper>
      </div>
      <MotionWrapper
        delay={0.4}
        className={'flex grow flex-col justify-center'}
      >
        <Top.TopNav />
      </MotionWrapper>
    </div>
  );
}
