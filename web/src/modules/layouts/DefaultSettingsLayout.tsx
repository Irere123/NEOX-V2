import React from "react";
import { useHistory } from "react-router-dom";

import { CloseIcon } from "../../icons";

export const Layout: React.FC = ({ children }) => {
  const history = useHistory();

  return (
    <div className="settingsPage__RightSideContent">
      <div className="settingsPage__RightSideContent__middle">{children}</div>
      <div className="settingsPage__RightSideContent__left">
        <div>
          <span
            className="settingsPage__RightSideContent__closeBtn"
            onClick={() => {
              history.goBack();
            }}
            onKeyPress={(e) => {
              if (e.keyCode === 27) {
                console.log("Pressed");
              }
            }}
          >
            <CloseIcon fill={"var(--color-primary-200)"} />
          </span>
          <span style={{ color: "var(--color-primary-200)" }}>ESC</span>
        </div>
      </div>
    </div>
  );
};

interface DefaultSettingsLayoutProps {
  modal?: React.ReactNode;
  logo?: React.ReactNode;
  children: [React.ReactNode, React.ReactNode];
}

export const DefaultSettingsLayout: React.FC<DefaultSettingsLayoutProps> = ({
  modal = null,
  logo = null,
  children,
}) => {
  return (
    <div className="settingsPage__layout">
      <div className="settingsPage__layout_leftSidebar">
        {logo}
        <div>{children[0]}</div>
      </div>
      <div className="settingsPage__layoutRightSide">{children[1]}</div>
      {modal}
    </div>
  );
};
