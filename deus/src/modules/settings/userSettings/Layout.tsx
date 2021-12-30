import React from "react";
import { useHistory } from "react-router-dom";

import { CloseIcon } from "../../../icons";

export const Layout: React.FC = ({ children }) => {
  const history = useHistory();

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid var(--color-primary-200)",
            cursor: "pointer",
          }}
          onClick={() => {
            history.goBack();
          }}
        >
          <CloseIcon fill={"var(--color-primary-200)"} />
        </span>
        <span style={{ color: "var(--color-primary-200)" }}>ESC</span>
      </div>
    </div>
  );
};
