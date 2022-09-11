import { Box, Button, Typography } from "@material-ui/core";
import React  from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useAppContext } from "../../context/appContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import {
  FormikAutocompleteComponent,
  FormikTextFieldComponent,
} from "../../utilities/formutilities";

const CreateEmployee = () => {
  const { company } = useAppContext();
  // const [employeeData, setEmployeeData] = useState({
  //   employeeCode: "",
  //   employeeName: "",
  //   employeeEmail: "",
  //   employeePassword: "",
  //   employeeRole: "",
  //   company_id: "",
  //   companyName: "",
  // });
  const history = useHistory();

  const createEmployee = async ( values) => {
    if (
      !values.employeeName ||
      !values.employeeEmail ||
      !values.employeePassword ||
      !values.employeeRole ||
      !values.employeeCode
    ) {
      return toast.error("Please fill all the fields required");
    }
    const newCompany = JSON.parse(company);
    let payload = {
      employeeCode: values.employeeCode,
      employeeName: values.employeeName,
      employeeEmail: values.employeeEmail,
      employeePassword: values.employeePassword,
      employeeRole: values.employeeRole,
      company_id: newCompany?.company_id,
      companyName: newCompany?.companyName,
    };


    const { data } = await axios.post(
      "https://taskmaganer-apis-nodejs.herokuapp.com/api/employee/createemployee",
      payload
    );
    
    if (data.msg === "Employee registered") {
      toast.success(data.msg);
      history.push("/mytask/AllEmployee");
    }
  };

  const EmployeeRole = [
    {
      value: "employee",
      label: "employee",
    },
    {
      value: "subAdmin",
      label: "subAdmin",
    },
  ];

  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <Grid item xs={12}>
        <Typography>Create Employee</Typography>
        <Paper>
          <Box p={2}>
            <div className="mb-12 lg:mb-0">
              <div className="block">
                {/* <form onSubmit={createEmployee}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Employee Code"
                                        variant="outlined"
                                        fullWidth
                                        value={employeeData.employeeCode}
                                        onChange={(e) => setEmployeeData({ ...employeeData, employeeCode: e.target.value })}
                                        margin="normal"
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label="Employee Name"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEmployeeData({ ...employeeData, employeeName: e.target.value })}
                                        value={employeeData.employeeName}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Employee Email"

                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEmployeeData({ ...employeeData, employeeEmail: e.target.value })}
                                        value={employeeData.employeeEmail}
                                        margin="normal"

                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Employee Password"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEmployeeData({ ...employeeData, employeePassword: e.target.value })}
                                        value={employeeData.employeePassword}
                                        margin="normal"


                                    />
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={EmployeeRole}
                                        getOptionLabel={(option) => option.label}
                                        fullWidth
                                        onChange={(e, value) => setEmployeeData({ ...employeeData, employeeRole: value.value })}
                                        renderInput={(params) => <TextField margin="normal"{...params} label="Employee Role" variant="outlined" />}
                                    />
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                        style={{
                                            backgroundColor: "#3d6889",
                                            color: "white",
                                          }}
                                    >
                                        Add new Employee
                                    </Button>
                                </form> */}
                <Formik
                  id="commissionForm"
                  size="large"
                  width={5}
                  initialValues={{
                    employeeCode: "",
                    employeeName: "",
                    employeeEmail: "",
                    employeePassword: "",
                    employeeRole: "",
                  }}
                  // validationSchema={}
                  onSubmit={(values, { resetForm }) => {
                    createEmployee(values);
                  }}
                  render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Field
                        name="employeeCode"
                        component={FormikTextFieldComponent}
                        fullWidth
                        variant="outlined"
                        label="Employee Code"
                        margin="normal"
                      />
                      <Field
                        name="employeeName"
                        component={FormikTextFieldComponent}
                        fullWidth
                        variant="outlined"
                        label="Employee Name"
                        margin="normal"
                      />
                      <Field
                        name="employeeEmail"
                        component={FormikTextFieldComponent}
                        fullWidth
                        variant="outlined"
                        label="employeeEmail"
                        margin="normal"
                      />
                      <Field
                        name="employeePassword"
                        component={FormikTextFieldComponent}
                        fullWidth
                        variant="outlined"
                        label="employeePassword"
                        margin="normal"
                      />
                      <Field
                        name="employeeRole"
                        component={FormikAutocompleteComponent}
                        options={EmployeeRole}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        style={{
                          backgroundColor: "#3d6889",
                          color: "white",
                        }}
                      >
                        Add new Employee
                      </Button>
                    </Form>
                  )}
                />
              </div>
            </div>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateEmployee;
