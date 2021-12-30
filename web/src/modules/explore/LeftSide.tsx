import React from "react";
import { useLocation, Link } from "react-router-dom";

import { ExtensionsIcon, FireIcon, RadarIcon } from "../../icons";

interface Props {}

const LeftSideExplorePage: React.FC<Props> = () => {
  const pathname = useLocation().pathname;

  const defaultPage = pathname === "/explore/trending";
  const momentsPage = pathname === "/explore/moments";
  const appsPage = pathname === "/explore/apps";

  return (
    <div className="explorePage__leftSidebar">
      <h4>Discover</h4>
      <div className="explorePage__leftSidebar_links">
        <Link to="/explore/trending">
          <div
            className={`explorePage__leftSidebar_link ${
              defaultPage ? "activeExplorePage" : ""
            }`}
          >
            <span>
              <FireIcon fill={defaultPage ? "var(--color-accent)" : "white"} />
            </span>
            <p>Trending</p>
          </div>
        </Link>
        <Link to="/explore/moments">
          <div
            className={`explorePage__leftSidebar_link ${
              momentsPage ? "activeExplorePage" : ""
            }`}
          >
            <span>
              <RadarIcon fill={momentsPage ? "var(--color-accent)" : "white"} />
            </span>
            <p>Moments</p>
          </div>
        </Link>
        <Link to="/explore/apps">
          <div
            className={`explorePage__leftSidebar_link ${
              appsPage ? "activeExplorePage" : ""
            }`}
          >
            <span>
              <ExtensionsIcon
                fill={appsPage ? "var(--color-accent)" : "white"}
              />
            </span>
            <p>Apps</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideExplorePage;
