import React from "react";

import { Logo } from "../../icons";

export const LandingPage: React.FC = () => {
  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      <div></div>
      <div className="flex flex-col justify-center items-center">
        <span className="flex justify-self-center self-center py-3">
          <Logo width="200" height="100" />
        </span>
      </div>
      <div></div>
    </div>
  );
};
