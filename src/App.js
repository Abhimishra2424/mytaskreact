import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppContext } from "./context/appContext";

import Admin from "./layouts/Admin";
import LandingPage from "./views/LandingPage/LandingPage";
import CompanyRegister from "./views/companyRegister/CompanyRegister";
import CompanyLogin from "./views/companyLogin/CompanyLogin";
import PrivateRoute from "./components/PrivateRoute";
import EmployeeLogin from "./views/employeeLogin/EmployeeLogin";

const App = () => {
  const { token } = useAppContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/mytask");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <Routes>
      <>
        {!token ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/company-login" element={<CompanyLogin />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/company-register" element={<CompanyRegister />} />
          </>
        ) : (
          <Route element={PrivateRoute}>
            <Route path="/mytask" index element={<Admin />} />
          </Route>
        )}
      </>
    </Routes>
  );
};

export default App;
