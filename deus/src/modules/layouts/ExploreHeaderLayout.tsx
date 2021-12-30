import React from "react";

import placeholder from "../../img/placeholder.jpg";

interface Props {
  title: string;
  inputPlaceholder?: string;
  notInput?: boolean;
}

const headerContainer = {
  background: `url(${placeholder})`,
  width: "61rem",
  maxWidth: "70rem",
  margin: "30px",
  height: "240px",
  display: "flex",
  flexDirection: "column" as any,
  justifyContent: "center",
  borderRadius: "10px",
};

const inputStyles = {
  border: "2px solid var(--color-accent)",
  height: "40px",
  outline: "none",
  width: "60%",
  borderRadius: "6px",
  padding: "0px 10px 0px 10px",
};

export const ExploreHeaderLayout: React.FC<Props> = ({
  title,
  inputPlaceholder = "Search NEOX",
  notInput = false,
}) => {
  return (
    <div style={headerContainer}>
      <h4 style={{ color: "var(--color-primary-900)", textAlign: "center" }}>
        {title}
      </h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!notInput ? (
          <input
            style={inputStyles}
            type="text"
            name=""
            placeholder={inputPlaceholder}
          />
        ) : null}
      </div>
    </div>
  );
};
