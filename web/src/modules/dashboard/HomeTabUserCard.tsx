import React from "react";

import { SolidMessages, SolidMoreVert } from "../../icons";
import { SingleUser } from "../../ui/Avatar";

interface HomeTabCardProps {
  src: string;
  user: any;
  status: "Online" | "Offline" | "Busy";
}

export const HomeTabUserCard: React.FC<HomeTabCardProps> = ({
  src,
  user,
  status,
}) => {
  return (
    <div className="HomeTab_userCard">
      <SingleUser
        src={src}
        username={user.username}
        size="md"
        status={status}
      />
      <div className="HomeTab_userCard_info">
        <div>
          <p>{user.username}</p>
          <p style={{ fontSize: "13px" }}>{status}</p>
        </div>
      </div>
      <div className="HomeTab_userCard_btns">
        <div>
          <SolidMessages width={20} height={20} />
        </div>
        <div>
          <SolidMoreVert />
        </div>
      </div>
    </div>
  );
};
