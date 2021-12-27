import React from "react";

import { EmojiIcon, PlusIcon } from "../../icons";

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
      </div>
    </div>
  );
};

export default MessageInput;
