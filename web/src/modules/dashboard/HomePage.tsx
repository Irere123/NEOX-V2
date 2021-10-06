import React from "react";
import { Friends } from "../../icons";

import DefaultPageLayout from "../../layouts/DefaultPageLayout";
import HomePageTop from "../../layouts/HomePageTop";
import { Middle } from "./Middle";
import { RightSide } from "./RightSide";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <DefaultPageLayout>
      <div className="homePage__layout">
        <HomePageTop>
          <div>
            <div className="HomePage__layoutPageTitle">
              <span>
                <Friends fill="white" />
              </span>
              <p style={{ color: "white" }}>Friends</p>
            </div>
          </div>
        </HomePageTop>
        <div className="homePage__layout__main">
          <Middle />
          <RightSide />
        </div>
      </div>
    </DefaultPageLayout>
  );
};

export default HomePage;
