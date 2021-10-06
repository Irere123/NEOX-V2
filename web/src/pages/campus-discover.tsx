import React from "react";
import Layout from "../layouts/Layout";

import "../styles/pages/CampusDiscover.css";
import CampusDiscoverPage from "../modules/discover/CampusDiscoverPage";

export default function CampusDiscover() {
  return (
    <Layout title="Campus Discovery - NEOX">
      <CampusDiscoverPage />
    </Layout>
  );
}
