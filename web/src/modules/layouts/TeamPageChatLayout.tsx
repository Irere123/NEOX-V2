import React from "react";
import MessageInput from "../team/MessageInput";

import TeamPageChat from "../team/TeamPageChat";
import TeamPageChatHeader from "../team/TeamPageChatHeader";

interface Props {
  team: any;
  room: any;
}

const TeamPageChatLayout: React.FC<Props> = ({ room, team }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TeamPageChatHeader room={room} team={team} />
      <div
        style={{ height: "100%", display: "flex", flex: "1", width: "100%" }}
      >
        <TeamPageChat room={room} />
      </div>
      <MessageInput room={room} />
    </div>
  );
};

export default TeamPageChatLayout;
