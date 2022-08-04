import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import Login from "./views/Login/Login";
import Admin from "./layouts/Admin";
import Register from "./views/Register/Register";
import LandingPage from "./views/LandingPage/LandingPage";
import { useAppContext } from "./context/appContext";

const App = () => {
  // const [user, setUser] = useState(false);

  const { user } = useAppContext();

  let location = useLocation();

  console.log("location====", location);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // setUser(true);
    } else {
      // setUser(false);
    }
  }, []);

  return (
    <Switch>
      {user === null ? (
        <>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </>
      ) : (
        <PrivateRoute path="/mytask" component={Admin} />
      )}
    </Switch>
  );
};

export default App;
