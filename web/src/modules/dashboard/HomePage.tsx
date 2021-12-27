import React from "react";
import { Friends } from "../../icons";

import DefaultPageLayout from "../layouts/DefaultPageLayout";
import MainPageTop from "../layouts/MainPageTop";
import { Middle } from "./Middle";
import { RightSide } from "./RightSide";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <DefaultPageLayout>
      <div className="homePage__layout">
        <MainPageTop>
          <div>
            <div className="HomePage__layoutPageTitle">
              <span>
                <Friends fill="white" />
              </span>
              <p style={{ color: "white" }}>Friends</p>
            </div>
          </div>
        </MainPageTop>
        <div className="homePage__layout__main">
          <Middle />
          <RightSide />
        </div>
      </div>
    </DefaultPageLayout>
  );
};

export default HomePage;
