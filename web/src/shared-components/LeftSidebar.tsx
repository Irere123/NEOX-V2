import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Friends, NeoxNitro, PlusIcon, SchoolIcon } from "../icons";

const loopArray = [1, 3, 4, 5];

export const LeftSide = () => {
  const pathname = useLocation().pathname;
  const history = useHistory();
  const defaultPage = pathname === "/home";
  const campusDisPage = pathname === "/campus-discovery";
  const nitroPage = pathname === "/nitro";

  return (
    <div className="homePage__layout_leftside">
      <div className="homePage__layout_leftside_header">
        <div>
          <p>Find conversations</p>
        </div>
      </div>
      <div className="homePage__layout_leftside_links_to_otherPages">
        <div
          className={`homePage__layout_leftside_link ${
            defaultPage
              ? "homePage__layout_leftside_link_active"
              : "homeLink_hover"
          }`}
          onClick={() => {
            history.push("/home");
          }}
        >
          <Friends fill="white" />
          <p>Friends</p>
        </div>
        <div
          className={`homePage__layout_leftside_link ${
            campusDisPage
              ? "homePage__layout_leftside_link_active"
              : "homeLink_hover"
          }`}
          onClick={() => {
            history.push("/campus-discovery");
          }}
        >
          <SchoolIcon />
          <p>Campus Discovery</p>
        </div>
        <div
          className={`homePage__layout_leftside_link ${
            nitroPage
              ? "homePage__layout_leftside_link_active"
              : "homeLink_hover"
          }`}
          onClick={() => {
            history.push("/nitro");
          }}
        >
          <NeoxNitro />
          <p>Nitro</p>
        </div>
      </div>
      <div className="directMessages__section">
        <div className="directMessages__section__header">
          <p>Direct Messages</p>
          <span>
            <span>
              <PlusIcon fill="white" style={{ cursor: "pointer" }} />
            </span>
          </span>
        </div>
        <div className="directMessages__section__dmEmptyPlaceholder">
          {loopArray.map(() => (
            <div className="directMessages__section__dmEmptyPlaceholder_main">
              <div></div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
