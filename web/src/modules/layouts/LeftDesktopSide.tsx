import React from "react";

import { LeftSide } from "../../shared-components/LeftSidebar";

const LeftDesktopSideStyles = {
  display: "grid",
  gridTemplateColumns: "250px 1fr",
};

export const LeftDesktopSide: React.FC = ({ children }) => {
  return (
    <div style={LeftDesktopSideStyles}>
      <LeftSide />
      {children}
    </div>
  );
};
