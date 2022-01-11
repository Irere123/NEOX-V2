import React from "react";

import { LandingPage } from "../modules/landing_page/LandingPage";
import { PageHeader } from "../modules/layouts/PageHeader";

export const Login: React.FC = () => {
  return (
    <PageHeader title="Login | NEOX">
      <LandingPage />
    </PageHeader>
  );
};
