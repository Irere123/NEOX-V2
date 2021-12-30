import React from "react";
import { GridPanel } from "./GridPanels";

export const TopPanel: React.FC = ({ children }) => {
  return <GridPanel>{children}</GridPanel>;
};
