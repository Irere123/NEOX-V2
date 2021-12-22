import React from "react";

import { EmojiIcon, PlusIcon } from "../../icons";
import { Room } from "../../types/CustomTypes";

type Props = {
  room: Room;
};

const TeamPageChat: React.FC<Props> = ({ room }) => {
  return (
    <div className="teamPageLayout__chat">
      <div className="teamPageLayout__chatMsgContainer">
        <h3>Messages</h3>
      </div>
      <div className="teamPageLayout__chatInput">
        <div>
          <span>
            <PlusIcon fill="white" />
          </span>
          <input type="text" placeholder={`Message #${room?.name}`} />
          <span>
            <EmojiIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamPageChat;
