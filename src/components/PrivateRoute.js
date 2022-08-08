import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAppContext();

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
