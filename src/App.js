import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppContext } from "./context/appContext";

import Admin from "./layouts/Admin";
import LandingPage from "./views/LandingPage/LandingPage";
import CompanyRegister from "./views/companyRegister/CompanyRegister";
import CompanyLogin from "./views/companyLogin/CompanyLogin";
import PrivateRoute from "./components/PrivateRoute";
import EmployeeLogin from "./views/employeeLogin/EmployeeLogin";
import {
  Button,
  CircularProgress,
  LinearProgress,
  makeStyles,
  TextField,
} from "@material-ui/core";

const App = () => {
  const { token, loginState } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/mytask");
    }else{
      history.push("/");
    }
  }, [history, token]);

  if (loginState) {
    return <LinearProgress color="primary" />;
  }

  return (
    <Switch>
      <>
        {!token ? (
          <>
            <Route path="/" exact component={LandingPage} />
            <Route path="/company-login" exact component={CompanyLogin} />
            <Route path="/employee-login" exact component={EmployeeLogin} />
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
