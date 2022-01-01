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

export const All: React.FC = () => {
  return (
    <DesktopHomeTabsLayout pageName="all friends" pageUserNum={5}>
      {users.map((u) => (
        <HomeTabUserCard src={src} user={u} status="Offline" />
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
