import React from "react";

import { ExplorePage } from "../modules/explore/ExplorePage";
import { PageHeader } from "../modules/layouts/PageHeader";

export const Explore: React.FC = () => {
  return (
    <PageHeader title="Explore | NEOX">
      <ExplorePage />
    </PageHeader>
  );
};
