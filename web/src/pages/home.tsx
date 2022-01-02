import React from "react";

import "../styles/pages/Home.css";
import HomePage from "../modules/dashboard/HomePage";
import PageHead from "../modules/layouts/PageHead";

export default function Home() {
  return (
    <PageHead title="Home | NEOX">
      <HomePage />
    </PageHead>
  );
}
