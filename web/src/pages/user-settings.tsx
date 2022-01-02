import React from "react";

import "../styles/pages/Settings.css";
import UserSettingsPage from "../modules/settings/userSettings/userSettingsPage";
import PageHead from "../modules/layouts/PageHead";

function UserSettings() {
  return (
    <PageHead title="Settings | NEOX">
      <UserSettingsPage />
    </PageHead>
  );
}

export default UserSettings;
