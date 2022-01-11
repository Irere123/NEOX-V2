import React from "react";

import { DashboardPage } from "../modules/dashboard/DashboardPage";
import { PageHeader } from "../modules/layouts/PageHeader";

export const Dashboard: React.FC = () => {
  return (
    <PageHeader title="Dashboard | NEOX">
      <DashboardPage />
    </PageHeader>
  );
};
