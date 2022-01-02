import React from "react";
import { useRequestQuery } from "../../generated/graphql";
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

export const Online: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <DesktopHomeTabsLayout pageName={t("pages.home.online")} pageUserNum={4}>
      {users.map((u) => (
        <HomeTabUserCard src={src} user={u} status="Online" userId={0} />
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
          userId={friend?.id}
        />
      ))}
    </DesktopHomeTabsLayout>
  );
};

export const Pending: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const { data } = useRequestQuery();

  return (
    <DesktopHomeTabsLayout
      pageName={t("pages.home.pending")}
      pageUserNum={data?.requests.length}
    >
      {data?.requests.map((r) => (
        <HomeTabUserCard
          src={r.isSender ? r.receiver.pictureUrl! : r.sender.pictureUrl!}
          user={r.isSender ? r.receiver! : r.sender!}
          status="Busy"
          userId={r.receiver.id}
        />
      ))}
    </DesktopHomeTabsLayout>
  );
};
