import React from "react";
import { GroupIcon, LightIcon, NeoxNitro } from "../../icons";

interface Props {
  team: any;
  room: any;
  handleToggle?: () => void;
}

const TeamPageChatHeader: React.FC<Props> = ({ room, handleToggle }) => {
  return (
    <div className="teamPageChatHeader">
      <div className="teamPageChatHeader__left">
        <p className="teamPageChatHeader__roomName">
          <span>#</span>
          {room?.name}
        </p>
      </div>
      <div className="teamPageChatHeader__right">
        <span onClick={handleToggle}>
          <GroupIcon style={{ cursor: "pointer" }} />
        </span>
        <span>
          <NeoxNitro />
        </span>
        <span>
          <LightIcon />
        </span>
      </div>
    </div>
  );
};

export default TeamPageChatHeader;
