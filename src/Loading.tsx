import React from "react";
import Lottie from "lottie-react";
import robot from "./assets/robot.json";

const Loading = () => (
  <Lottie
    animationData={robot}
    loop={true}
    className="h-[6rem] w-[6rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
  />
);

export default Loading;
