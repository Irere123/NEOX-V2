import React from "react";
import { Link } from "react-router-dom";

import src from "../../img/avatar.png";
import { SingleUser } from "../../ui/Avatar";
import { SettingsIcon, SearchIcon } from "../../icons";

export const MobileHeader: React.FC = () => {
  return (
    <div className="MobileHeader__layout">
      <span>
        <SingleUser src={src} size="md" status="Online" />
      </span>
      <div className="MobileHeader__layout_icons">
        <span>
          <SearchIcon />
        </span>
        <span>
          <Link to={`/settings`}>
            <SettingsIcon />
          </Link>
        </span>
      </div>
    </div>
  );
};
