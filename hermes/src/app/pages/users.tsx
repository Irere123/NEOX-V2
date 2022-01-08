import React from "react";

import { PageHeader } from "../modules/layouts/PageHeader";
import { UsersPage } from "../modules/users/UsersPage";

export const Users: React.FC = () => {
  return (
    <PageHeader title="Users | NEOX">
      <UsersPage />
    </PageHeader>
  );
};
