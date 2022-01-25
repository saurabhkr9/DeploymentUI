import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ToasterApi } from "../../components/Toaster";
import auth from "./auth";
export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          if((rest.admin && auth.isAdmin())||(!rest.admin)){
            return <Component {...props} />;
          }
        } else {
          ToasterApi.alert('User is not logged in!')
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
