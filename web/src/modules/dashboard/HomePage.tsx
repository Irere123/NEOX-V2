import React, { useState } from "react";
import { useTabs, TabPanel } from "react-headless-tabs";

import AddFriendModal from "../modals/AddFriendModal";
import { Friends } from "../../icons";
import DefaultPageLayout from "../layouts/DefaultPageLayout";
import MainPageTop from "../layouts/MainPageTop";
import { All, Online, Pending } from "./Pages";
import { RightSide } from "./RightSide";
import { TabSelector } from "./TabSelector";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useTabs(["Online", "All", "Pending"]);

  return (
    <DefaultPageLayout>
      <div className="homePage__layout">
        <MainPageTop>
          <div className="homePage__header">
            <div className="HomePage__layoutPageTitle">
              <span>
                <Friends fill="white" />
              </span>
              <p style={{ color: "white" }}>Friends</p>
            </div>
            <div className="homePage__headerLinks">
              <TabSelector onClick={() => setSelectedTab("Online")}>
                <p>Online</p>
              </TabSelector>
              <TabSelector onClick={() => setSelectedTab("All")}>
                <p>All</p>
              </TabSelector>
              <TabSelector onClick={() => setSelectedTab("Pending")}>
                <p>Pending</p>
              </TabSelector>
              <div className="homePage__headerLinks__addFriend">
                <button onClick={() => setOpenModal(!openModal)}>
                  Add friend
                </button>
              </div>
            </div>
            {openModal && (
              <AddFriendModal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(!openModal)}
              />
            )}
          </div>
        </MainPageTop>
        <div className="homePage__layout__main">
          <div className="homePage__layout_mainMiddle">
            <TabPanel hidden={selectedTab !== "Online"}>
              <Online />
            </TabPanel>
            <TabPanel hidden={selectedTab !== "All"}>
              <All />
            </TabPanel>
            <TabPanel hidden={selectedTab !== "Pending"}>
              <Pending />
            </TabPanel>
          </div>
          <RightSide />
        </div>
      </div>
    </DefaultPageLayout>
  );
};

export default HomePage;
