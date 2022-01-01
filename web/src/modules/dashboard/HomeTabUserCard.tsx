import React from "react";

import { EmojiIcon, PodcastsIcon } from "../../icons";
import { SingleUser } from "../../ui/Avatar";

interface HomeTabCardProps {
  src: string;
  user: any;
  isOnline: boolean;
}

export const HomeTabUserCard: React.FC<HomeTabCardProps> = ({
  src,
  user,
  isOnline,
}) => {
  return (
    <div className="HomeTab_userCard">
      <SingleUser
        src={src}
        username={user.username}
        size="md"
        isOnline={isOnline}
      />
      <div className="HomeTab_userCard_info">
        <div>
          <p>{user.username}</p>
          <p>{isOnline ? <>Online</> : <>Offline</>}</p>
        </div>
      </div>
      <div className="HomeTab_userCard_btns">
        <div>
          <PodcastsIcon />
        </div>
        <div>
          <EmojiIcon />
        </div>
      </div>
    </div>
  );
};
