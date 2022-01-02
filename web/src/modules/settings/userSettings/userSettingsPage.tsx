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
import { Language } from "./Language";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";

const LogoComp: React.FC = () => {
  return (
    <span style={{ marginTop: "30px" }}>
      <Logo />
    </span>
  );
};

const UserSettingsPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [selectedTab, setSelectedTab] = useTabs([
    "My acccount",
    "User profile",
    "Language",
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
            {t("pages.settings.my_account")}
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "User profile"}
            onClick={() => setSelectedTab("User profile")}
          >
            {t("pages.settings.user_profile")}
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Language"}
            onClick={() => setSelectedTab("Language")}
          >
            {t("pages.settings.language")}
          </TabSelector>
        </div>

        <div className="Tab">
          <p className="TabsCategoryTitle">APP SETTINGS</p>
          <TabSelector
            isActive={selectedTab === "Appearance"}
            onClick={() => setSelectedTab("Appearance")}
          >
            {t("pages.settings.appearance")}
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Notifications"}
            onClick={() => setSelectedTab("Notifications")}
          >
            {t("pages.settings.notifications")}
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Keybinds"}
            onClick={() => setSelectedTab("Keybinds")}
          >
            {t("pages.settings.keybinds")}
          </TabSelector>
          <br />
        </div>
        <div className="Additional__Info">
          <span>{t("pages.settings.change_log")}</span>
          <span
            className="Additional__InfoBtn"
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
        <TabPanel hidden={selectedTab !== "Language"}>
          <Layout>
            <Language />
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
