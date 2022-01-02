import React from "react";
import findIndex from "lodash/findIndex";
import { useParams } from "react-router-dom";

import { useTeamQuery } from "../../generated/graphql";
import Layout from "../layouts/PageHead";
import ViewTeamLayout from "../layouts/ViewTeamLayout";
import TeamPageChatLayout from "../layouts/TeamPageChatLayout";
import { TeamPageParams } from "../../types/CustomTypes";

const TeamPage: React.FC = () => {
  const { roomId, teamId }: TeamPageParams = useParams();
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
        <TeamPageChatLayout room={room} team={team} />
      </ViewTeamLayout>
    </Layout>
  );
};

export default TeamPage;
