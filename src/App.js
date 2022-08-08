import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppContext } from "./context/appContext";

import Admin from "./layouts/Admin";
import LandingPage from "./views/LandingPage/LandingPage";
import CompanyRegister from "./views/companyRegister/CompanyRegister";
import CompanyLogin from "./views/companyLogin/CompanyLogin";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const { token } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/mytask");
    }
  }, [history, token])

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [history, token])

  return (
    <Switch>
      <>
        {!token ? (
          <>
            <Route path="/" exact component={LandingPage} />
            <Route path="/company-login" exact component={CompanyLogin} />
            <Route path="/company-register" exact component={CompanyRegister} />
          </>
        ) : (
          <PrivateRoute path="/mytask" component={Admin} />
        )}
      </>
    </Switch>
  );
};

export default App;
