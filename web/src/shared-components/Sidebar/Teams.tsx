import React from "react";
import { Link } from "react-router-dom";

import { Team } from "../../generated/graphql";
import { Tooltip } from "../../ui/Tooltip";

interface Props {
  teams: any;
}

const Teams: React.FC<Props> = ({ teams }) => {
  return (
    <>
      {teams?.map((team: Team) => (
        <Tooltip content={team.name} direction="right" key={team.id}>
          <div className="teamContainer">
            <Link to={`/team/${team.id}`}>
              <div className="teamLogo">
                {team.name.charAt(0).toUpperCase()}
                {team.name
                  .charAt(Math.floor(team.name.length / 3))
                  .toUpperCase()}
              </div>
            </Link>
          </div>
        </Tooltip>
      ))}
    </>
  );
};

export default Teams;
