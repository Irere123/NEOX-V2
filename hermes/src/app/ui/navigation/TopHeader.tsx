import React from "react";

import src from "../../img/avatar.png";
import { SingleUser } from "../UserAvatar";

export const TopHeader: React.FC = () => {
  return (
    <div className="flex p-3">
      <div>
        <SingleUser src={src} size="md" />
      </div>
    </div>
  );
};
