import React from "react";

import { PageHeader } from "../modules/layouts/PageHeader";
import { MapPage } from "../modules/map/MapPage";

export const Map: React.FC = () => {
  return (
    <PageHeader title="Map | NEOX">
      <MapPage />
    </PageHeader>
  );
};
