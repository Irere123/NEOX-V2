import React from "react";

import { PageHeader } from "../modules/layouts/PageHeader";
import { SearchPage } from "../modules/search/SearchPage";

export const Search: React.FC = () => {
  return (
    <PageHeader title="Search | NEOX">
      <SearchPage />
    </PageHeader>
  );
};
