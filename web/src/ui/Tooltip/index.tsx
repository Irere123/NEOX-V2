import React, { useState } from "react";

import "./tooltip.css";

interface Props {
  delay?: any;
  direction: "right" | "left" | "top" | "bottom";
  content: string;
}

export const Tooltip: React.FC<Props> = ({
  delay = 50,
  direction,
  content,
  children,
}) => {
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || "top"}`}>{content}</div>
      )}
    </div>
  );
};
