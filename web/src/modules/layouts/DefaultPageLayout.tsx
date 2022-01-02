import React from "react";
import { LeftSide } from "../../shared-components/LeftSidebar";

import Sidebar from "../../shared-components/Sidebar";

const defaultPageLayout = {
  display: "grid",
  gridTemplateColumns: "70px 1fr",
  height: "100vh",
  width: "100vw",
};

const defaultPageLayoutMain = {
  display: "grid",
  gridTemplateColumns: "250px 1fr",
};

const DefaultPageLayout: React.FC = ({ children }) => {
  return (
    <div style={defaultPageLayout}>
      <Sidebar />
      <div style={defaultPageLayoutMain}>
        <LeftSide />
        {children}
      </div>
    </div>
  );
};

export default DefaultPageLayout;
