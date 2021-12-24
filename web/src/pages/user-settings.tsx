import React from "react";

import "../styles/pages/Settings.css";
import Layout from "../layouts/Layout";
import UserSettingsPage from "../modules/settings/userSettings/userSettingsPage";

function UserSettings() {
  return (
    <Layout title="Settings">
      <UserSettingsPage />
    </Layout>
  );
}

export default UserSettings;
