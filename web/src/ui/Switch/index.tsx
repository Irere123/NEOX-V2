import React from "react";

import "./switch.css";

interface SwitchProps {
  checked: any;
  handleToogle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, handleToogle }) => {
  return (
    <>
      <input
        checked={checked}
        onChange={handleToogle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: checked && "#06D6A0" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
