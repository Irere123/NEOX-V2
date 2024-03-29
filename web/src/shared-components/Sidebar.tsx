import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import "../styles/Modals.css";
import placeholder from "../img/neox.png";
import Teams from "./Sidebar/Teams";
import CreateTeamModal from "../modules/modals/CreateTeamModal";
import { PlusIcon, SettingsIcon } from "../icons";
import { Tooltip } from "../ui/Tooltip";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";
import { UserContext } from "../hooks/userContext";

const Sidebar = withRouter(({ history }) => {
  const [isError, setError] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const { user } = useContext(UserContext);
  const hasTeams = user?.teams.length! > 0;
  const { t } = useTypeSafeTranslation();

  return (
    <div className="appSidebar">
      <div className="appSidebar__Avatar_container">
        <Tooltip content="Home" direction="right">
          <div className="appSidebar__Avatar ">
            <img
              src={isError ? placeholder : user?.pictureUrl!}
              alt={user?.username}
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
          <Teams teams={user?.teams} />
        </div>
      ) : null}
      <div className="appSidebar__Buttons_container">
        <div className="appSidebarTeam__button">
          <Tooltip content={t("tooltips.create_team")} direction="right">
            <button onClick={() => setModal(!modal)}>
              <PlusIcon fill="lightgreen" />
            </button>
          </Tooltip>
        </div>

        <div className="appSidebarTeam__button">
          <Tooltip content={t("tooltips.settings")} direction="right">
            <button
              onClick={() => {
                history.push("/settings");
              }}
            >
              <SettingsIcon fill="lightgreen" />
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
