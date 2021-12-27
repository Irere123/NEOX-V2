import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";

import { useMeQuery } from "../generated/graphql";
import { LoadingScreen } from "../shared-components/LoadingScreen";

export const RedirectRoute: React.FC<any> = ({
  component: Component,
  ...props
}) => {
  const { data, loading } = useMeQuery();

  const renderRoute = (routeProps: RouteComponentProps<{}>) => {
    if (!data || loading) {
      // loading screen
      return <LoadingScreen />;
    }

    if (data?.me) {
      // user logged in
      return <Redirect to={{ pathname: "/home" }} />;
    } else {
      return <Component {...routeProps} />;
    }
  };

  return <Route {...props} render={renderRoute} />;
};
