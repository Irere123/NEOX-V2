import React from "react";

import "../styles/pages/Explore.css";
import ExplorePage from "../modules/explore/ExplorePage";
import PageHead from "../modules/layouts/PageHead";

export default function Explore() {
  return (
    <PageHead title="Explore | NEOX">
      <ExplorePage />
    </PageHead>
  );
}
