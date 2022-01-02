import React from "react";

import { DirectRoomPage } from "../modules/direct-room/DirectRoomPage";
import PageHead from "../modules/layouts/PageHead";

export default function DMRoom() {
  return (
    <PageHead title="Direct Room | NEOX">
      <DirectRoomPage />
    </PageHead>
  );
}
