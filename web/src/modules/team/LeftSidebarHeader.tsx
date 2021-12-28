import React from "react";

import { SolidExpandMore } from "../../icons";
import { DropdownController } from "../../ui/DropdownController";
import TeamDropDown from "./TeamDropdown";

const LeftSidebarHeader: React.FC<{ teamName: string | undefined }> = ({
  teamName,
}) => {
  return (
    <div className="teamPageLayout__leftSidebar_header">
      <p>{teamName}</p>
      <div className="teamPageLayout__leftSidebar_header_icon">
        <DropdownController overlay={() => <TeamDropDown />}>
          <SolidExpandMore />
        </DropdownController>
      </div>
    </div>
  );
};

export default LeftSidebarHeader;
