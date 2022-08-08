import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import RealMeLogo from '../../../src/realbooks.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from "../../context/appContext";

import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  button: {
    background: "#304ED8",
    color: "#fff",
    "&:hover": {
      background: "#3D5AFE",
    },
  },
});

const CompanyRegister = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isLoading, createCompany } =
    useAppContext()

  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyEmail: "",
    companyPassword: "",
  });

  const handleCompanySave = (e) => {
    e.preventDefault();
    if (companyData.companyName === "" || companyData.companyEmail === "" || companyData.companyPassword === "") {
      toast.error("Please fill all the fields required");
    }
    else {
      createCompany({ company: companyData });
      history.push("/");
    }

  }


  return (
    <div>
      <ToastContainer />
      <section className="mb-40">
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
          <div className="px-6 w-full flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <Link className="navbar-brand text-blue-600" to="/">
                <img src={RealMeLogo} alt="RealMe" style={{
                  width: '40px',
                  height: '40px',
                }}
                />
              </Link>
            </div>
            <div className="flex items-center items-center lg:ml-auto">
              <Button
                type="button"
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<LockOpenIcon />}
              ><Link to="/login">Login</Link></Button>
            </div>
          </div>
        </nav>

        <div className="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="grid lg:grid-cols-2 gap-12 flex items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                  The best Task Management <br />
                  <span className="text-blue-600">For Your Business</span>
                </h1>
              </div>
              <div className="mb-12 lg:mb-0">
                <div className="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
                  <form onSubmit={handleCompanySave}>
                    <TextField
                      id="companyName"
                      label="Company Name*"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={companyData.companyName}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          companyName: e.target.value,
                        })
                      }


                    />
                    <TextField
                      id="companyEmail"
                      label="Company Email*"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={"email"}
                      value={companyData.companyEmail}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          companyEmail: e.target.value,
                        })
                      }

                    />
                    <TextField
                      id="companyPassword"
                      label="Company Password*"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="password"
                      value={companyData.companyPassword}
                      onChange={(e) =>
                        setCompanyData({
                          ...companyData,
                          companyPassword: e.target.value,
                        })
                      }

                    />
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      className={classes.button}
                      disabled={isLoading}
                    >
                       Register Company
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyRegister;
