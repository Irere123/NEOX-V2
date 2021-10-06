import React from "react";
import { Link, useParams } from "react-router-dom";

import LeftSidebarHeader from "./LeftSidebarHeader";
import { useTeamQuery } from "../../generated/graphql";

interface Props {}

interface Params {
  teamId: string;
  roomId: string;
}

const LeftSidebar: React.FC<Props> = () => {
  const { teamId }: Params = useParams();

  const { data } = useTeamQuery({
    variables: { teamId },
  });
  const team = data?.team;

  return (
    <div className="teamPageLayout__leftSidebar">
      <LeftSidebarHeader teamName={team?.name} />
      <div>
        {team?.rooms.map((room) => (
          <div key={room.id}>
            <Link to={`/team/${team.id}/${room.id}`}>
              <p>{room.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;