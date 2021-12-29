import React from "react";

export const TabSelector = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => <div onClick={onClick}>{children}</div>;
