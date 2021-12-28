import React, { useState } from "react";

import { SolidExpandMore } from "../../icons";
import { DropdownController } from "../../ui/DropdownController";
import TeamDropDown from "./TeamDropdown";
import CreateChannelModal from "../../components/Modals/CreateChannelModal";
import InvitePeopleModal from "../../components/Modals/InvitePeopleModal";

const LeftSidebarHeader: React.FC<{ teamName: string | undefined }> = ({
  teamName,
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
