import React from "react";

import TeamPageChat from "../modules/team/TeamPageChat";
import TeamPageChatHeader from "../modules/team/TeamPageChatHeader";

interface Props {
  team: any;
  room: any;
}

const TeamPageChatLayout: React.FC<Props> = ({ room, team }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TeamPageChatHeader room={room} team={team} />
      <div style={{ height: "100%" }}>
        <TeamPageChat room={room} />
      </div>
    </div>
  );
};

export default TeamPageChatLayout;
