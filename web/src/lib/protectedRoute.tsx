import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";

import { useMeQuery } from "../generated/graphql";

export const ProtectedRoute: React.FC<any> = ({
  component: Component,
  ...props
}) => {
  const { data, loading } = useMeQuery();

  const renderRoute = (routeProps: RouteComponentProps<{}>) => {
    if (!data || loading) {
      // loading screen
      return null;
    }

    if (!data?.me) {
      // user not logged in
      return <Redirect to={{ pathname: "/" }} />;
    }

    return <Component {...routeProps} />;
  };

  return <Route {...props} render={renderRoute} />;
};
