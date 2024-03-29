import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProtectedRoute } from "./lib/protectedRoute";
import { RedirectRoute } from "./lib/redirectRoute";
import { UserContext } from "./hooks/userContext";
import { useMeQuery } from "./generated/graphql";

import Home from "./pages/home";
import Login from "./pages/login";
import Explore from "./pages/explore";
import UserSettings from "./pages/user-settings";
import Team from "./pages/team";
import Features from "./pages/features";
import TeamSettings from "./pages/team-settings";
import DMRoom from "./pages/dm-room";

function Routes() {
  const { data } = useMeQuery();

  const value = data?.me as any;

  return (
    <UserContext.Provider value={{ user: value }}>
      <Router>
        <Switch>
          <RedirectRoute path="/" exact component={Login} />
          <RedirectRoute path="/features" exact component={Features} />
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute path="/explore" exact component={Explore} />
          <ProtectedRoute
            path="/team/:teamId?/:roomId?"
            exact
            component={Team}
          />
          <ProtectedRoute path="/dm/:userId?" exact component={DMRoom} />
          <ProtectedRoute path="/settings" exact component={UserSettings} />
          <ProtectedRoute
            path="/:teamId/settings"
            exact
            component={TeamSettings}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default Routes;
