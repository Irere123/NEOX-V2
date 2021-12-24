import React, { useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Logo } from "../../../icons";
import Logout from "./Logout";

import { TabSelector } from "./TabSelector";

const UserSettingsPage: React.FC = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [selectedTab, setSelectedTab] = useTabs([
    "My acccount",
    "User profile",
    "Appearance",
    "Notifications",
    "Keybinds",
  ]);

  return (
    <div className="userSettingsPage__layout">
      <div className="userSettingsPage__layoutLeftSidebar">
        <span style={{ marginTop: "30px" }}>
          <Logo />
        </span>
        <div>
          <div className="Tab">
            <p className="TabsCategoryTitle">USER SETTINGS</p>
            <TabSelector
              isActive={selectedTab === "My acccount"}
              onClick={() => setSelectedTab("My acccount")}
            >
              My account
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "User profile"}
              onClick={() => setSelectedTab("User profile")}
            >
              User profile
            </TabSelector>
          </div>

          <div className="Tab">
            <p className="TabsCategoryTitle">APP SETTINGS</p>
            <TabSelector
              isActive={selectedTab === "Appearance"}
              onClick={() => setSelectedTab("Appearance")}
            >
              Appearance
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "Notifications"}
              onClick={() => setSelectedTab("Notifications")}
            >
              Notifications
            </TabSelector>
            <TabSelector
              isActive={selectedTab === "Keybinds"}
              onClick={() => setSelectedTab("Keybinds")}
            >
              Keybinds
            </TabSelector>
            <br />
          </div>
          <div className="Additional__Info">
            <span>Changelog</span>
            <span
              className="logout_btn"
              onClick={() => setOpenLogoutModal(!openLogoutModal)}
            >
              Log out
            </span>
            <b style={{ fontSize: "15px" }}>{window.navigator.platform}</b>
          </div>
        </div>
      </div>
      <div className="userSettingsPage__layoutRightSide">
        <TabPanel hidden={selectedTab !== "My acccount"}>
          <div>My account</div>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "User profile"}>
          <div>User profile</div>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "Appearance"}>
          <div>Appearance</div>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "Notifications"}>
          <div>Notifications</div>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "Keybinds"}>
          <div>Keybinds</div>
        </TabPanel>
      </div>
      {openLogoutModal && (
        <Logout
          isOpen={openLogoutModal}
          onRequestClose={() => setOpenLogoutModal(!openLogoutModal)}
        />
      )}
    </div>
  );
};

export default UserSettingsPage;
