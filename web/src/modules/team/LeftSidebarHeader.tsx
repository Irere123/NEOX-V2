import React, { useState } from "react";

import { SolidExpandMore } from "../../icons";
import { DropdownController } from "../../ui/DropdownController";
import TeamDropDown from "./TeamDropdown";
import CreateChannelModal from "../modals/CreateChannelModal";
import InvitePeopleModal from "../modals/InvitePeopleModal";

interface LeftSidebarHeaderProps {
  team: any;
}

const LeftSidebarHeader: React.FC<LeftSidebarHeaderProps> = ({ team }) => {
  const [openChannelModal, setOpenChannelModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  return (
    <div className="teamPageLayout__leftSidebar_header">
      <p>{team?.name}</p>
      <div className="teamPageLayout__leftSidebar_header_icon">
        <DropdownController
          overlay={() => (
            <TeamDropDown
              team={team!}
              setOpenChannelModal={() => setOpenChannelModal(!openChannelModal)}
              setOpenInviteModal={() => setOpenInviteModal(!openInviteModal)}
            />
          )}
        >
          <SolidExpandMore />
        </DropdownController>
      </div>
      {openChannelModal && (
        <CreateChannelModal
          isOpen={openChannelModal}
          onRequestClose={() => setOpenChannelModal(!openChannelModal)}
        />
      )}
      {openInviteModal && (
        <InvitePeopleModal
          isOpen={openInviteModal}
          onRequestClose={() => setOpenInviteModal(!openInviteModal)}
        />
      )}
    </div>
  );
};

export default LeftSidebarHeader;
