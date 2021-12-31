import React, { useState } from "react";
import { useTabs, TabPanel } from "react-headless-tabs";

import { TabSelector } from "../../../ui/TabSelector";
import {
  DefaultSettingsLayout,
  Layout,
} from "../../layouts/DefaultSettingsLayout";

export const TeamSettingsPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useTabs([
    "Overview",
    "Enable Community",
    "Members",
    "Bans",
  ]);

  return (
    <DefaultSettingsLayout>
      <>
        <div className="Tab">
          <p className="TabsCategoryTitle">IR13's Team</p>
          <TabSelector
            isActive={selectedTab === "Overview"}
            onClick={() => setSelectedTab("Overview")}
          >
            Overview
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Members"}
            onClick={() => setSelectedTab("Members")}
          >
            Members
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Enable Community"}
            onClick={() => setSelectedTab("Enable Community")}
          >
            Enable Community
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Bans"}
            onClick={() => setSelectedTab("Bans")}
          >
            Bans
          </TabSelector>
        </div>
        <div className="Additional__Info">
          <span className="logout_btn" onClick={() => setOpenModal(!openModal)}>
            Delete team
          </span>
          <b style={{ fontSize: "15px" }}>{window.navigator.userAgent}</b>
        </div>
      </>

      <>
        <TabPanel hidden={selectedTab !== "Overview"}>
          <Layout>
            <h1>Overview</h1>
          </Layout>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "Members"}>
          <Layout>
            <h1>Members</h1>
          </Layout>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "Enable Community"}>
          <Layout>
            <h1>Enable community</h1>
          </Layout>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "Bans"}>
          <Layout>
            <h1>Bans</h1>
          </Layout>
        </TabPanel>
      </>
    </DefaultSettingsLayout>
  );
};
