import React from "react";

import "../styles/pages/Home.css";
import HomePage from "../modules/dashboard/HomePage";
import Layout from "../modules/layouts/Layout";

export default function Home() {
  return (
    <Layout title="Home | NEOX">
      <HomePage />
    </Layout>
  );
}
