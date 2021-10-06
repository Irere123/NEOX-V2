import React from "react";

import LeftSidebar from "../modules/team/LeftSidebar";
import Sidebar from "../shared-components/Sidebar";

interface Props {}

const viewTeamLayout = {
  display: "grid",
  gridTemplateColumns: "70px 1fr",
  height: "100vh",
  width: "100vw",
};

const ViewTeamLayoutMain = {
  display: "grid",
  gridTemplateColumns: "250px 1fr",
};

const ViewTeamLayout: React.FC<Props> = ({ children }) => {
  return (
    <div style={viewTeamLayout}>
      <Sidebar />
      <div style={ViewTeamLayoutMain}>
        <LeftSidebar />
        {children}
      </div>
    </div>
  );
};

export default ViewTeamLayout;
