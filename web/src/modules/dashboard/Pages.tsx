import React from "react";

import src from "../../img/avatar.png";
import { DesktopHomeTabsLayout } from "../layouts/DesktopHomeTabsLayout";
import { HomeTabUserCard } from "./HomeTabUserCard";

const users = [
  {
    username: "Irere",
  },
  {
    username: "Jason",
  },
  {
    username: "Mike",
  },
  {
    username: "Jasper",
  },
];

const uPending = [{ username: "Harry" }, { username: "Potter" }];

export const Online: React.FC = () => {
  return (
    <DesktopHomeTabsLayout pageName="online" pageUserNum={4}>
      {users.map((u) => (
        <HomeTabUserCard src={src} user={u} status="Online" />
      ))}
    </DesktopHomeTabsLayout>
  );
};

interface AllTabProps {
  friends: any;
}

interface Friend {
  id: any;
  username: string;
  pictureUrl: string;
  bio: string;
}

export const All: React.FC<AllTabProps> = ({ friends }) => {
  return (
    <DesktopHomeTabsLayout pageName="all friends" pageUserNum={friends.length}>
      {friends.map((friend: Friend) => (
        <HomeTabUserCard
          src={friend?.pictureUrl}
          user={friend}
          status="Offline"
        />
      ))}
    </DesktopHomeTabsLayout>
  );
};

export const Pending: React.FC = () => {
  return (
    <DesktopHomeTabsLayout pageName="pending requests" pageUserNum={2}>
      {uPending.map((u) => (
        <HomeTabUserCard src={src} user={u} status="Busy" />
      ))}
    </DesktopHomeTabsLayout>
  );
};
