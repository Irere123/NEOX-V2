import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProtectedRoute } from "./lib/protectedRoute";
import { RedirectRoute } from "./lib/redirectRoute";

import Home from "./pages/home";
import Login from "./pages/login";
import Explore from "./pages/explore";
import UserSettings from "./pages/user-settings";
import CampusDiscover from "./pages/campus-discover";
import Nitro from "./pages/nitro";
import ExploreApps from "./pages/explore-apps";
import ExploreMoments from "./pages/explore-moments";
import Team from "./pages/team";

function Routes() {
  return (
    <Router>
      <Switch>
        <RedirectRoute path="/" exact component={Login} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/explore/trending" exact component={Explore} />
        <ProtectedRoute path="/team/:teamId?/:roomId?" exact component={Team} />
        <ProtectedRoute path="/explore/apps" exact component={ExploreApps} />
        <ProtectedRoute
          path="/explore/moments"
          exact
          component={ExploreMoments}
        />
        <ProtectedRoute path="/user-settings" exact component={UserSettings} />
        <ProtectedRoute
          path="/campus-discovery"
          exact
          component={CampusDiscover}
        />
        <ProtectedRoute path="/nitro" exact component={Nitro} />
      </Switch>
    </Router>
  );
}

export default Routes;
