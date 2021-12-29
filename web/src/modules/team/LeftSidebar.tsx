import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import LeftSidebarHeader from "./LeftSidebarHeader";
import { useTeamQuery } from "../../generated/graphql";
import { PlusIcon } from "../../icons";
import CreateChannelModal from "../../components/Modals/CreateChannelModal";

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
      <LeftSidebarHeader teamName={team?.name} />
      <div className="teamPageLayout__leftSidebar__rooms">
        <div className="teamPageLayout__leftSidebar__roomsListHeader">
          <p style={{ fontSize: "20px", margin: "0", paddingTop: "20px" }}>
            Text Channels
          </p>
          <span onClick={() => setOpenModal(!openModal)}>
            <PlusIcon />
          </span>
        </div>
        <div className="teamPageLayout__leftSidebar__roomsList">
          {team?.rooms.map((room) => (
            <div key={room.id}>
              <Link
                to={`/team/${team.id}/${room.id}`}
                className="teamPageLayout__channelName"
              >
                <p>
                  <span className="teamChannelName__hashtag">#</span>
                  <span>{room.name}</span>
                </p>
              </Link>
            </div>
          ))}
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
