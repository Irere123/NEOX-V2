import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import LeftSidebarHeader from "./LeftSidebarHeader";
import { useTeamQuery } from "../../generated/graphql";
import { PlusIcon, PodcastsIcon, SolidBook, SolidLock } from "../../icons";
import CreateChannelModal from "../modals/CreateChannelModal";

interface Props {}

interface Params {
  teamId: string;
  roomId: string;
}

const LeftSidebar: React.FC<Props> = () => {
  const { teamId }: Params = useParams();
  const [openModal, setOpenModal] = useState(false);

  const { data } = useTeamQuery({
    variables: { teamId },
  });
  const team = data?.team;

  return (
    <div className="teamPageLayout__leftSidebar">
      <LeftSidebarHeader teamName={team?.name} isOwner={team?.isAdmin} />
      <div className="teamPageLayout__leftSidebar__rooms">
        <div className="teamPageLayout__leftSidebar__roomsListHeader">
          <p
            style={{
              fontSize: "18px",
              margin: "0",
              paddingTop: "20px",
              textTransform: "uppercase",
            }}
          >
            Channels
          </p>
          <span onClick={() => setOpenModal(!openModal)}>
            <PlusIcon />
          </span>
        </div>
        <div className="teamPageLayout__leftSidebar__roomsList">
          {team?.rooms.map((room) => {
            let icon;

            if (!room.public) {
              icon = <SolidLock width="16" height="16" />;
            } else if (room.ann) {
              icon = <PodcastsIcon width="16" height="16" />;
            } else if (room.rules) {
              icon = <SolidBook width="16" height="16" />;
            } else {
              icon = <>#</>;
            }
            return (
              <div key={room.id}>
                <Link
                  to={`/team/${team.id}/${room.id}`}
                  className="teamPageLayout__channelName"
                >
                  <p>
                    <span className="teamChannelName__hashtag">{icon}</span>
                    <span>{room.name}</span>
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {openModal && (
        <CreateChannelModal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(!openModal)}
        />
      )}
    </div>
  );
};

export default LeftSidebar;
