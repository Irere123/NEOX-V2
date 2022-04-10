import React from "react";

export const GridPanel: React.FC = ({ children }) => {
  return <div className={`flex  w-full`}>{children}</div>;
};

export const FixedGridPanel: React.FC = ({ children }) => {
  return (
    <div className={`flex px-2 flex-col sticky top-0  mb-3`}>{children}</div>
  );
};
