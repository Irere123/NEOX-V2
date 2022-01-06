import React from "react";

import { useScreenType } from "../../hooks/useScreenType";
import { BottomPanel, LeftPanel, RightPanel, TopPanel } from "./GridPanels";

interface MainLayoutProps {
  bottomPanel?: React.ReactNode;
  middlePanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

const DesktopLayoutStyles = {
  display: "grid",
  gridTemplateColumns: "70px 1fr",
  height: "100vh",
  width: "100vw",
};

const SmallScreenStyles = {
  width: "100vw",
  height: "100vh",
};

export const MainLayout: React.FC<MainLayoutProps> = ({
  middlePanel,
  leftPanel = <div />,
  mobileHeader = <div />,
  rightPanel = <div />,
  bottomPanel = <div />,
}) => {
  const screenType = useScreenType();

  let middle = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <div style={DesktopLayoutStyles}>
          <LeftPanel>{leftPanel}</LeftPanel>
          <RightPanel>{rightPanel}</RightPanel>
        </div>
      );
      break;

    case "2-cols":
      middle = (
        <div style={DesktopLayoutStyles}>
          <LeftPanel>{leftPanel}</LeftPanel>
          <RightPanel>{rightPanel}</RightPanel>
        </div>
      );
      break;
    case "1-cols":
      middle = (
        <div style={SmallScreenStyles} className="smallScreen__homePage">
          <TopPanel>{mobileHeader}</TopPanel>
          {middlePanel}
          <BottomPanel>{bottomPanel}</BottomPanel>
        </div>
      );
  }

  return <>{middle}</>;
};
