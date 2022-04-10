import React from "react";
import { LeftPanel } from "../../ui/LeftPanel";
import { TopPanel } from "../../ui/TopPanel";

interface MainLayoutProps {
  leftPanel?: React.ReactNode;
  topPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel,
  topPanel,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <TopPanel>{topPanel}</TopPanel>
      <div className="flex h-full w-full">
        <LeftPanel>{leftPanel}</LeftPanel>
        <div>{children}</div>
      </div>
    </div>
  );
};
