import React from "react";

interface Props {
  pageName?: string;
  pageUserNum?: number;
}

export const DesktopHomeTabsLayout: React.FC<Props> = ({
  pageName,
  pageUserNum,
  children,
}) => {
  return (
    <div className="HomeTab__layout">
      <p className="HomeTab__layoutPageTitle">
        {pageName} - <span>{pageUserNum}</span>
      </p>
      <div className="HomeTab__cards">{children}</div>
    </div>
  );
};
