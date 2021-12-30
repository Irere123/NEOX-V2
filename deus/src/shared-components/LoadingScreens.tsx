import React from "react";

import "../styles/LoadingScreens.css";

export const MessagesLoadingScreen: React.FC = () => {
  return (
    <div className="LoadingScreen__layout">
      <div className="Message__loading">
        <span></span>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <span></span>
        </div>
      </div>
      <div className="Message__loading">
        <span></span>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <span style={{ height: "60px" }}></span>
        </div>
      </div>
      <div className="Message__loading">
        <span></span>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <span style={{ height: "190px" }}></span>
        </div>
      </div>
      <div className="Message__loading">
        <span></span>
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <span style={{ height: "25px", width: "300px" }}></span>
        </div>
      </div>
    </div>
  );
};
