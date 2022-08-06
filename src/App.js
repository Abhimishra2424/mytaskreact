import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import Login from "./views/Login/Login";
import Admin from "./layouts/Admin";
import LandingPage from "./views/LandingPage/LandingPage";
import { useAppContext } from "./context/appContext";
import CompanyRegister from "./views/companyRegister/CompanyRegister";

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
          <Route path="/company-register" exact component={CompanyRegister} />
        </>
      ) : (
        <PrivateRoute path="/mytask" component={Admin} />
      )}
      {/* <Route path="/mytask" component={Admin} /> */}
    </Switch>
  );
};

export default App;
