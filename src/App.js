import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation, } from "react-router-dom";

import Login from './views/Login/Login';
import Admin from './layouts/Admin'
import Register from "./views/Register/Register";


let user = false;

const App = () => {

  let location = useLocation()

  console.log("location====", location)

  // useEffect(() => {
  //   document.body.classList.add("white-content");
  //   return function cleanup() {
  //     document.body.classList.remove("white-content");
  //   };
  // });

  return (
    <Switch>
      {
        user ? (
          <Route path="/mytask" exact component={Admin} />
        ) : (
          <>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="*"
              render={() => {
                <div>NOT Found</div>
              }}
            />
          </>
        )
      }
    </Switch>
  )
}

export default App