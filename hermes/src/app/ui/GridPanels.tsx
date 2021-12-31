import React from "react";

export const GridPanel: React.FC = ({ children }) => {
  return <div className={`flex  w-full`}>{children}</div>;
};

export const FixedGridPanel: React.FC = ({ children }) => {
  return <div className={`flex  flex-col sticky top-0 h-full`}>{children}</div>;
};
