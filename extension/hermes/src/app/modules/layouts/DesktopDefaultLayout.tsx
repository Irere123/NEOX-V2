import React from "react";

import { LeftSidebar } from "../../ui/navigation";
import { TopHeader } from "../../ui/navigation";
import { MainLayout } from "./MainLayout";

export const DesktopDefaultLayout: React.FC = ({ children }) => {
  return (
    <MainLayout leftPanel={<LeftSidebar />} topPanel={<TopHeader />}>
      {children}
    </MainLayout>
  );
};
