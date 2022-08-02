import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// core components

import Login from './views/Login/Login';
import Admin from './layouts/Admin'


let user = true;

const App = () => {


  useEffect(() => {
    if (user === false) {
      return <Redirect to="/login" />
    }
  }, []);

  return (
    <Switch>
      {
        user ? (
          <Route path="/" component={Admin} />
        ) : (
          <Route path="/login" component={Login} />
        )
      }
    </Switch>
  )
}

export default App