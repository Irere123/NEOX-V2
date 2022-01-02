import React from "react";

const PageHead: React.FC<{ title: string }> = ({ children, title }) => {
  document.title = title;
  return <>{children}</>;
};

export default PageHead;
