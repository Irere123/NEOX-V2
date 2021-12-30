import React from "react";
import { SolidCompass } from "../../icons";

export const LeftSidebar: React.FC = () => {
  return (
    <div className="bg-primary-700 w-7 h-full">
      <span>
        <SolidCompass />
      </span>
      <span>
        <SolidCompass />
      </span>
      <span>
        <SolidCompass />
      </span>
      <span>
        <SolidCompass />
      </span>
    </div>
  );
};
