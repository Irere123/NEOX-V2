import React from "react";

import Button from "../../ui/Button";

interface Props {}

export const Middle: React.FC<Props> = () => {
  return (
    <div className="homePage__layout_mainMiddle">
      <p style={{ fontSize: "24px" }}>Add friends</p>
      <p>You don't have any friends yet </p>
      <div className="homePage__layout_mainMiddle__sendInvite">
        <input type="text" placeholder="Your friends name" />
        <Button type="submit">Send Request</Button>
      </div>
    </div>
  );
};
