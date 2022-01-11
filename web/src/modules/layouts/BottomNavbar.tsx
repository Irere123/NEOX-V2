import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Friends,
  PlusIcon,
  SolidExplore,
  SolidHome,
  SolidMessages,
} from "../../icons";
import CreateTeamModal from "../modals/CreateTeamModal";

export const BottomNavbar: React.FC = () => {
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const pathname = useLocation().pathname;

  const isHome = pathname === "/home";
  const isExplore = pathname === "/explore";

  return (
    <div className="BottomNavbar">
      <div>
        <Link to={`/home`}>
          <SolidHome
            width={20}
            height={20}
            fill={isHome ? "var(--color-accent)" : "white"}
          />
        </Link>
      </div>
      <div>
        <Link to={`/explore`}>
          <SolidExplore
            width={20}
            height={20}
            fill={isExplore ? "var(--color-accent)" : "white"}
          />
        </Link>
      </div>
      <div onClick={() => setOpenCreateTeamModal(!openCreateTeamModal)}>
        <PlusIcon />
      </div>
      <div>
        <SolidMessages />
      </div>
      <div>
        <Friends />
      </div>
      {openCreateTeamModal && (
        <CreateTeamModal
          isOpen={openCreateTeamModal}
          onRequestClose={() => setOpenCreateTeamModal(!openCreateTeamModal)}
        />
      )}
    </div>
  );
};
