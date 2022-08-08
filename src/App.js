import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";

import Login from "./views/Login/Login";
import Admin from "./layouts/Admin";
import LandingPage from "./views/LandingPage/LandingPage";

import CompanyRegister from "./views/companyRegister/CompanyRegister";
import { useAppContext } from "./context/appContext";

const App = () => {

  const { company, token } =
    useAppContext()

  let location = useLocation();
  let history = useHistory();

  console.log("location====", location);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  useEffect(() => {

    if (token === null) {
      history.push("/login");
    } else if (company) {
      history.push("/");
    }

  }, [company, history, token])


  return (
    <Switch>

      <>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/company-register" exact component={CompanyRegister} />
      </>

      <PrivateRoute path="/mytask" component={Admin} />

    </Switch>
  );
};

export default App;
