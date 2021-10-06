import React from "react";
import { withRouter } from "react-router-dom";

import "../styles/Modals.css";
import placeholder from "../img/neox.png";
import Teams from "./Sidebar/Teams";
import { useMeQuery } from "../generated/graphql";
import { CompassIcon, PlusIcon } from "../icons";
import { Tooltip } from "../ui/Tooltip";
import CreateTeamModal from "../components/Modals/CreateTeamModal";

const Sidebar = withRouter(({ history }) => {
  const [isError, setError] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const { data } = useMeQuery();
  const me = data?.me;
  const hasTeams = me?.teams.length! > 0;

  return (
    <div className="appSidebar">
      <div className="appSidebar__Avatar_container">
        <Tooltip content="Home" direction="right">
          <div className="appSidebar__Avatar ">
            <img
              src={isError ? placeholder : me?.pictureUrl!}
              alt={me?.username}
              onError={() => setError(true)}
              onClick={() => {
                history.push("/home");
              }}
            />
          </div>
        </Tooltip>

        <hr className="separator" />
      </div>
      {hasTeams ? (
        <div className="appSidebar__Teams_container">
          <Teams teams={me?.teams} />
        </div>
      ) : null}
      <div className="appSidebar__Buttons_container">
        <div className="appSidebarTeam__button">
          <Tooltip content="Create a team" direction="right">
            <button onClick={() => setModal(!modal)}>
              <PlusIcon fill="lightgreen" />
            </button>
          </Tooltip>
        </div>
        <div className="appSidebarTeam__button">
          <Tooltip content="Explore" direction="right">
            <button
              onClick={() => {
                history.push("/explore/trending");
              }}
            >
              <CompassIcon fill="lightgreen" />
            </button>
          </Tooltip>
        </div>
      </div>
      {modal ? (
        <CreateTeamModal
          isOpen={modal}
          onRequestClose={() => setModal(!modal)}
        />
      ) : null}
    </div>
  );
});

export default Sidebar;
