import React from "react";
import { useLocation, Link } from "react-router-dom";

import {
  SolidCompass,
  SolidHome,
  SolidPeople,
  SolidRocket,
  SolidSearch,
} from "../../icons";
import Circle from "../Circle";

export const LeftSidebar: React.FC = () => {
  const pathname = useLocation().pathname;
  const isActive = (link: string) => {
    if (pathname === link) {
      return true;
    }
    return false;
  };

  const color = (link: string): string => {
    if (isActive(link)) {
      return "var(--color-accent)";
    } else {
      return "white";
    }
  };

  return (
    <div className="bg-primary-800 w-7 h-full flex flex-col justify-evenly  items-center rounded-5">
      <Link to={`/dash`}>
        <Circle>
          <SolidHome width={20} height={20} fill={color("/dash")} />
        </Circle>
      </Link>
      <Link to="/explore">
        <Circle>
          <SolidCompass width={20} height={20} fill={color("/explore")} />
        </Circle>
      </Link>
      <Link to={`/map`}>
        <Circle>
          <SolidRocket width={20} height={20} fill={color("/map")} />
        </Circle>
      </Link>
      <Link to={`/search`}>
        <Circle>
          <SolidSearch width={18} height={18} fill={color("/search")} />
        </Circle>
      </Link>
      <Link to={`/users`}>
        <Circle>
          <SolidPeople width={20} height={20} fill={color("/users")} />
        </Circle>
      </Link>
    </div>
  );
};
