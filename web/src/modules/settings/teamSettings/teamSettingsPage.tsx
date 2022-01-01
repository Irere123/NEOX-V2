import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTabs, TabPanel } from "react-headless-tabs";

import { useTeamQuery } from "../../../generated/graphql";
import { TabSelector } from "../../../ui/TabSelector";
import {
  DefaultSettingsLayout,
  Layout,
} from "../../layouts/DefaultSettingsLayout";
import { TeamPageParams } from "../../../types/CustomTypes";

export const TeamSettingsPage: React.FC = () => {
  const { teamId }: TeamPageParams = useParams();
  const { data } = useTeamQuery({
    variables: {
      teamId,
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useTabs([
    "Overview",
    "Enable Community",
    "Members",
    "Bans",
  ]);

  const team = data?.team;

  return (
    <DefaultSettingsLayout>
      <>
        <div className="Tab">
          <p className="TabsCategoryTitle">{team?.name}</p>
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
          {team?.isAdmin ? (
            <span
              className="Additional__InfoBtn"
              onClick={() => setOpenModal(!openModal)}
            >
              Delete team
            </span>
          ) : (
            <span className="Additional__InfoBtn">Leave team</span>
          )}

          <b style={{ fontSize: "15px" }}>{window.navigator.platform}</b>
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
