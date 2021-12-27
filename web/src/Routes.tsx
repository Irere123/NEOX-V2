import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ProtectedRoute } from "./lib/protectedRoute";
import { RedirectRoute } from "./lib/redirectRoute";

import Home from "./pages/home";
import Login from "./pages/login";
import Explore from "./pages/explore";
import UserSettings from "./pages/user-settings";
import Nitro from "./pages/nitro";
import Team from "./pages/team";

function Routes() {
  return (
    <Router>
      <Switch>
        <RedirectRoute path="/" exact component={Login} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/explore" exact component={Explore} />
        <ProtectedRoute path="/team/:teamId?/:roomId?" exact component={Team} />
        <ProtectedRoute path="/settings" exact component={UserSettings} />
        <ProtectedRoute path="/nitro" exact component={Nitro} />
      </Switch>
    </Router>
  );
}

export default Routes;
