import React from "react";

export const PageHeader: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  document.title = title;
  return <>{children}</>;
};
