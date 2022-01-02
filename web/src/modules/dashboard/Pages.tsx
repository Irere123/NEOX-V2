import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

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
  const { t } = useTypeSafeTranslation();

  return (
    <DesktopHomeTabsLayout pageName={t("pages.home.online")} pageUserNum={4}>
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
  const { t } = useTypeSafeTranslation();

  return (
    <DesktopHomeTabsLayout
      pageName={t("pages.home.friends")}
      pageUserNum={friends.length}
    >
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
  const { t } = useTypeSafeTranslation();

  return (
    <DesktopHomeTabsLayout pageName={t("pages.home.pending")} pageUserNum={2}>
      {uPending.map((u) => (
        <HomeTabUserCard src={src} user={u} status="Busy" />
      ))}
    </DesktopHomeTabsLayout>
  );
};
