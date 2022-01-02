import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import src from "../img/avatar.png";
import { CloseIcon, CompassIcon, Friends, PlusIcon } from "../icons";
import { SingleUser } from "../ui/Avatar";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";

const loopArray = [1, 3, 4, 5];

export const LeftSide = () => {
  const { t } = useTypeSafeTranslation();
  const pathname = useLocation().pathname;
  const history = useHistory();
  const defaultPage = pathname === "/home";
  const explorePage = pathname === "/explore";
  const isEmpty = false;

  return (
    <div className="homePage__layout_leftside">
      <div className="homePage__layout_leftside_header">
        <div>
          <p>{t("pages.home.find_conversations")}</p>
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
          <p>{t("pages.home.friends")}</p>
        </div>
        <div
          className={`homePage__layout_leftside_link ${
            explorePage
              ? "homePage__layout_leftside_link_active"
              : "homeLink_hover"
          }`}
          onClick={() => {
            history.push("/explore");
          }}
        >
          <CompassIcon />
          <p>{t("pages.home.explore")}</p>
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
        {!isEmpty ? (
          <div className="directMessages__section_users">
            <div className="directMessages__section_users_userCard">
              <SingleUser src={src} status="Online" size="sm" />
              <div>
                <p>Irere</p>
                <div className="hidden_container">
                  <span className="hidden">
                    <CloseIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="directMessages__section__dmEmptyPlaceholder">
            {loopArray.map(() => (
              <div className="directMessages__section__dmEmptyPlaceholder_main">
                <div></div>
                <div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
