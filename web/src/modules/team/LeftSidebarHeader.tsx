import React from "react";

const LeftSidebarHeader: React.FC<{ teamName: string | undefined }> = ({
  teamName,
}) => {
  return (
    <div className="teamPageLayout__leftSidebar_header">
      <p>{teamName}</p>
    </div>
  );
};

export default LeftSidebarHeader;
