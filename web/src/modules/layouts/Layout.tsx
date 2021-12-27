import React from "react";

const Layout: React.FC<{ title: string }> = ({ children, title }) => {
  document.title = title;
  return <>{children}</>;
};

export default Layout;
