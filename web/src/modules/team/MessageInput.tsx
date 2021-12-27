import React from "react";

import { EmojiIcon, PlusIcon, SolidPoll } from "../../icons";

interface Props {
  room: any;
}

const MessageInput: React.FC<Props> = ({ room }) => {
  return (
    <div className="teamPageLayout__chatInput">
      <div>
        <span>
          <PlusIcon fill="white" />
        </span>
        <input type="text" placeholder={`Message #${room?.name}`} />

        <span>
          <EmojiIcon />
        </span>
        <span>
          <SolidPoll />
        </span>
      </div>
    </div>
  );
};

export default MessageInput;
