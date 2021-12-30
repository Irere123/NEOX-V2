import React, { useState } from "react";

import Modal from "../../ui/Modal";
import { GroupIcon, LightIcon, SettingsIcon } from "../../icons";
import TeamMembersModal from "../modals/TeamMembersModal";

interface Props {
  team: any;
  room: any;
  handleToggle?: () => void;
}

const TeamPageChatHeader: React.FC<Props> = ({ room, team }) => {
  const [openMembersModal, setOpenMembersModal] = useState(false);

  return (
    <div className="teamPageChatHeader">
      <div className="teamPageChatHeader__left">
        <p className="teamPageChatHeader__roomName">
          <span>#</span>
          {room?.name}
        </p>
      </div>
      <div className="teamPageChatHeader__right">
        <span onClick={() => setOpenMembersModal(!openMembersModal)}>
          <GroupIcon />
        </span>
        <span>
          <SettingsIcon />
        </span>
        <span>
          <LightIcon />
        </span>
      </div>
      {openMembersModal && (
        <Modal
          isOpen={openMembersModal}
          onRequestClose={() => setOpenMembersModal(!openMembersModal)}
          title="TEAM MEMBERS"
        >
          <TeamMembersModal team={team} />
        </Modal>
      )}
    </div>
  );
};

export default TeamPageChatHeader;
