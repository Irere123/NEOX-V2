import React from "react";

import src from "../../img/avatar.png";
import { SingleUser } from "../../ui/Avatar";

import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { DesktopHomeTabsLayout } from "../layouts/DesktopHomeTabsLayout";
import { HomeTabUserCard } from "./HomeTabUserCard";
import { useRequestQuery } from "../../generated/graphql";
import { AcceptButton, CancelButton } from "./Components";

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
      {data?.requests.map((r, idx) => (
        <div className="HomeTab_userCard" key={idx}>
          <SingleUser
            src={r.isSender ? r.receiver?.pictureUrl! : r.sender?.pictureUrl!}
            username={r.isSender ? r.receiver?.username! : r.sender.username}
            size="md"
            status="Offline"
          />
          <div className="HomeTab_userCard_info">
            <div>
              <p>{r.isSender ? r.receiver?.username! : r.sender.username}</p>
              <p style={{ fontSize: "13px" }}>Offline</p>
            </div>
          </div>
          <div className="HomeTab_userCard_btns">
            {r.isSender ? (
              <CancelButton r={r!} />
            ) : (
              <>
                <AcceptButton r={r!} />
                <CancelButton r={r!} />
              </>
            )}
          </div>
        </div>
      ))}
    </DesktopHomeTabsLayout>
  );
};
