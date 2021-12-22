import React from "react";
import findIndex from "lodash/findIndex";
import { useParams } from "react-router-dom";

import { useTeamQuery } from "../../generated/graphql";
import Layout from "../../layouts/Layout";
import ViewTeamLayout from "../../layouts/ViewTeamLayout";
import TeamPageChatHeader from "./TeamPageChatHeader";

interface Params {
  teamId: string;
  roomId: string;
}

const TeamPage: React.FC = () => {
  const { roomId, teamId }: Params = useParams();
  const { data } = useTeamQuery({
    variables: { teamId },
  });

  const team = data?.team;

  const roomIdInteger = parseInt(roomId, 10);
  const roomIdx = roomIdInteger
    ? findIndex(team?.rooms, ["id", roomIdInteger])
    : 0;
  const room = roomIdx === -1 ? team?.rooms[0] : team?.rooms[roomIdx];

  return (
    <Layout title={`${team?.name}`}>
      <ViewTeamLayout>
        <TeamPageChatHeader room={room} team={team} />
      </ViewTeamLayout>
    </Layout>
  );
};

export default TeamPage;
