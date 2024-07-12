import * as Top from "@/features/top/conponents/Index"
import MotionWrapper from "./components/motion/motionWrapper";

export default function TopPage() {
  return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full flex flex-col items-center justify-end grow">
          <MotionWrapper delay={0}>
            <Top.TopImg />
          </MotionWrapper >
          <MotionWrapper delay={0.2}>
            <Top.TopTitle />
          </MotionWrapper>
        </div>
        <MotionWrapper delay={0.4} className={"flex flex-col justify-center grow"}>
          <Top.TopNav />
        </MotionWrapper>
      </div>
  );
}
