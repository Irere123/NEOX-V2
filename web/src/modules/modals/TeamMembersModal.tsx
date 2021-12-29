import React from "react";
import { useParams } from "react-router-dom";

import { useTeamMembersQuery } from "../../generated/graphql";
import placeholder from "../../img/placeholder.jpg";
import { TeamPageParams } from "../../types/CustomTypes";

const TeamMembersModal: React.FC<{ team: any }> = ({ team }) => {
  const [isError, setError] = React.useState(false);
  const { teamId }: TeamPageParams = useParams();
  const { data, loading } = useTeamMembersQuery({
    variables: {
      teamId,
    },
  });

  if (loading) {
    return null;
  }
  return (
    <div>
      {data?.getTeamMembers.map((member) => (
        <div>
          <img
            src={isError ? placeholder : (member.pictureUrl as any)}
            onError={() => setError(true)}
            alt="user"
            width="40"
            height="40"
          />
          {team?.isAdmin ? (
            <div>
              <span>ADMIN</span>
              <p>{member.username}</p>
            </div>
          ) : (
            <div>
              <p>{member.username}</p>
            </div>
          )}
          <p>{member.username}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamMembersModal;
