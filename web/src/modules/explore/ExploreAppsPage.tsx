import React from "react";
import {
  ExtensionsIcon,
  GroupIcon,
  SearchIcon,
  SettingsIcon,
} from "../../icons";
import DefaultPageLayout from "../../layouts/DefaultPageLayout";

interface Props {}

const appsPlaceholder = [1, 3, 4, 5, 6, 7, 8, 9, 10];

export const ExploreAppsPage: React.FC<Props> = () => {
  return (
    <DefaultPageLayout>
      <div>
        <div className="ExploreAppPage__header">
          <span className="ExploreAppPage__title">
            <span>
              <ExtensionsIcon />
            </span>
            <p style={{ fontSize: "17px" }}>App Store</p>
          </span>
          <span>
            <span style={{ cursor: "pointer" }}>
              <SettingsIcon fill="white" width="22" height="22" />
            </span>
          </span>
        </div>
        <div className="ExploreAppPage__topSection">
          <div className="ExploreAppPage__topSection__search">
            <span>
              <SearchIcon fill="white" />
            </span>
            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search for apps"
            />
          </div>
        </div>
        <div className="ExploreAppPage__bottomSection">
          <div className="ExploreAppPage__bottomSection__apps">
            {appsPlaceholder.map((p) => (
              <div className="ExploreAppPage__bottomSection_appCard">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p>Irere</p>
                <span>
                  <span>
                    <GroupIcon />
                  </span>
                  <p>100K</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
};
