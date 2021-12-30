import React from "react";
import { FixedGridPanel } from "./GridPanels";

interface LeftPanelProps {}

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return <FixedGridPanel>{children}</FixedGridPanel>;
};
