import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();

    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }