import React, { useState } from "react";

import { SolidExpandMore } from "../../icons";
import { DropdownController } from "../../ui/DropdownController";
import TeamDropDown from "./TeamDropdown";
import CreateChannelModal from "../modals/CreateChannelModal";
import InvitePeopleModal from "../modals/InvitePeopleModal";

interface LeftSidebarHeaderProps {
  teamName: string | undefined;
  isOwner: boolean | undefined;
}

const LeftSidebarHeader: React.FC<LeftSidebarHeaderProps> = ({
  teamName,
  isOwner,
}) => {
  const [openChannelModal, setOpenChannelModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  return (
    <div className="teamPageLayout__leftSidebar_header">
      <p>{teamName}</p>
      <div className="teamPageLayout__leftSidebar_header_icon">
        <DropdownController
          overlay={() => (
            <TeamDropDown
              isOwner={isOwner!}
              teamName={teamName!}
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
