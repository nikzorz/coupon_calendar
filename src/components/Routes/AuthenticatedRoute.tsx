import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {AuthStatuses, useAuth} from "../../hooks/use-auth";

export const AuthenticatedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const {
    authStatus
  } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (authStatus === AuthStatuses.AUTHENTICATED) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location
              }
            }}
          />
        )
      }}
    />
  )
}