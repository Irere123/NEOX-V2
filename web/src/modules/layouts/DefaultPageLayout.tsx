import React from "react";

import Sidebar from "../../shared-components/Sidebar";
import { BottomNavbar } from "./BottomNavbar";
import { LeftDesktopSide } from "./LeftDesktopSide";
import { MainLayout } from "./MainLayout";
import { MobileHeader } from "./MobileHeader";

const DefaultPageLayout: React.FC = ({ children }) => {
  return (
    <MainLayout
      leftPanel={<Sidebar />}
      rightPanel={<LeftDesktopSide children={children} />}
      mobileHeader={<MobileHeader />}
      bottomPanel={<BottomNavbar />}
      middlePanel={<>{children}</>}
    />
  );
};

export default DefaultPageLayout;
