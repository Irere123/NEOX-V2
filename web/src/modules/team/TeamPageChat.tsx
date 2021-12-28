import React from "react";

import { Room } from "../../types/CustomTypes";
import MessagesContainer from "./MessagesContainer";

type Props = {
  room: Room;
};

const TeamPageChat: React.FC<Props> = ({ room }) => {
  return (
    <div className="teamPageLayout__chat">
      <div className="teamPageLayout__chatMsgContainer">
        <MessagesContainer room={room} />
      </div>
    </div>
  );
};

export default TeamPageChat;
