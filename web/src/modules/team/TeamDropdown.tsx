import React from "react";
import { Link } from "react-router-dom";

import { NeoxNitro, FriendsAdd, SettingsIcon, PlusIcon } from "../../icons";

const TeamDropDown: React.FC = () => {
  return (
    <div className="teamDropDown__overlay">
      <div className="teamDropDown__overlay__btn">
        <p>Team boost</p>
        <span>
          <NeoxNitro />
        </span>
      </div>
      <div className="teamDropDown__overlay__btn marked">
        <p>Invite people</p>
        <span>
          <FriendsAdd fill="var(--color-accent-disabled)" />
        </span>
      </div>
      <Link to="/team-settings">
        <div className="teamDropDown__overlay__btn">
          <p>Team settings</p>
          <span>
            <SettingsIcon />
          </span>
        </div>
      </Link>
      <div className="teamDropDown__overlay__btn">
        <p>Create channel</p>
        <span>
          <PlusIcon />
        </span>
      </div>
    </div>
  );
};

export default TeamDropDown;
