import React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <span
    className={` TabLink ${isActive ? "TabLink--active" : "TabLink--inactive"}`}
    onClick={onClick}
  >
    {children}
  </span>
);
