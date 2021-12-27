import React from "react";

import DefaultPageLayout from "../layouts/DefaultPageLayout";
import { ExploreHeaderLayout } from "../layouts/ExploreHeaderLayout";

interface Props {}

const ExplorePage: React.FC<Props> = () => {
  return (
    <DefaultPageLayout>
      <ExploreHeaderLayout
        title="Explore trending Teams on NEOX"
        inputPlaceholder="Searrch for trending communities"
      />
    </DefaultPageLayout>
  );
};

export default ExplorePage;
