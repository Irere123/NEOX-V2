import React, { useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";

import {
  DefaultSettingsLayout,
  Layout,
} from "../../layouts/DefaultSettingsLayout";
import { MyAccount } from "./MyAccount";
import { Profile } from "./Profile";
import Logout from "./Logout";
import Modal from "../../../ui/Modal";

import { TabSelector } from "../../../ui/TabSelector";
import { Logo } from "../../../icons";

const LogoComp: React.FC = () => {
  return (
    <span style={{ marginTop: "30px" }}>
      <Logo />
    </span>
  );
};

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
    <DefaultSettingsLayout
      logo={<LogoComp />}
      modal={
        openLogoutModal && (
          <Modal
            title="Confirm to logout"
            isOpen={openLogoutModal}
            onRequestClose={() => setOpenLogoutModal(!openLogoutModal)}
          >
            <Logout />
          </Modal>
        )
      }
    >
      <>
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
      </>
      <>
        <TabPanel hidden={selectedTab !== "My acccount"}>
          <Layout>
            <MyAccount />
          </Layout>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "User profile"}>
          <Layout>
            <Profile />
          </Layout>
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
      </>
    </DefaultSettingsLayout>
  );
};

export default UserSettingsPage;
