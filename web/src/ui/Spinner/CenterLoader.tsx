import React from "react";
import { Logo } from "../../icons";
import Spinner from "./Spinner";

interface CenterLoaderProps {}

export const CenterLoader: React.FC<CenterLoaderProps> = () => {
  return (
    <div className={`center-content`}>
      <Spinner size="6" />
      <div style={{ marginTop: "30px" }}>
        <Logo />
      </div>
    </div>
  );
};
