import React from "react";

import "../styles/pages/Explore.css";
import ExplorePage from "../modules/explore/ExplorePage";
import Layout from "../modules/layouts/Layout";

export default function Explore() {
  return (
    <Layout title="Explore | NEOX">
      <ExplorePage />
    </Layout>
  );
}
