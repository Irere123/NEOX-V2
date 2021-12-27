import React from "react";
import { useLocation } from "react-router";
import { LeftSide } from "../../shared-components/LeftSidebar";
import LeftSideExplorePage from "../explore/LeftSide";

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
  const pathname = useLocation().pathname;
  let isExplorepage = false;

  if (
    pathname === "/explore/trending" ||
    pathname === "/explore/apps" ||
    pathname === "/explore/moments"
  ) {
    isExplorepage = true;
  }

  return (
    <div style={defaultPageLayout}>
      <Sidebar />
      <div style={defaultPageLayoutMain}>
        {!isExplorepage ? <LeftSide /> : <LeftSideExplorePage />}
        {children}
      </div>
    </div>
  );
};

export default DefaultPageLayout;
