import React from "react";

interface Props {}

export const RightSide: React.FC<Props> = () => {
  return (
    <div className="homePage__layout_mainRightSide">
      <p>Active now</p>
      <div>
        <p>It's quite for now</p>
        <p>
          When a friend starts an activity—like playing a game or hanging out on
          voice—we’ll show it here!
        </p>
      </div>
    </div>
  );
};
