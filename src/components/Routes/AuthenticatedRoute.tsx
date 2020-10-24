import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom'
import { useAuth} from "../../hooks/auth/use-auth";
import {APIStatuses} from "../../hooks/api/use-api";

export const AuthenticatedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const {
    apiStatus
  } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (apiStatus === APIStatuses.VALID) ? (
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