import React from "react";
import { DesktopDefaultLayout } from "../layouts/DesktopDefaultLayout";
import { MainInnerContent } from "./MainInnerContent";

export const DashboardPage: React.FC = () => {
  return (
    <DesktopDefaultLayout>
      <MainInnerContent />
    </DesktopDefaultLayout>
  );
};
