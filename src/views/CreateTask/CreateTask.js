import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useAppContext } from "../../context/appContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));
const CreateTask = () => {
  const classes = useStyles();
  const { company, token, AllEmployees } = useAppContext();
  const history = useHistory();
  const [createTaskData, setCreateTaskData] = useState({
    taskCode: "",
    title: "",
    description: "",
    status: "",
    employeeCode: "",
    employeeName: "",
    employeeEmail: "",
  });

  const [company_id, setCompany_id] = useState(null);
  const [companyName, setCompanyName] = useState("");
  // eslint-disable-next-line
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");

  const statusOptions = [
    {
      value: "open",
      label: "open",
    },
    {
      value: "in progress",
      label: "in progress",
    },
    {
      value: "done",
      label: "done",
    },
  ];

  useEffect(() => {
    var decoded = jwt_decode(token);
    const companyid = decoded?.payload?.company?.company_id;
    setCompany_id(companyid);
    const companyname = decoded?.payload?.company?.companyName;
    setCompanyName(companyname);
  }, [token]);

  const createTask = async (e) => {
    e.preventDefault();

    let payload = {
      taskCode: createTaskData.taskCode,
      title: createTaskData.title,
      description: createTaskData.description,
      status: createTaskData.status.value,
      company_id: company_id,
      companyName: companyName,
      employeeCode: createTaskData.employeeCode,
      employeeName: createTaskData.employeeName.value,
      employeeEmail: createTaskData.employeeEmail,
    };
    console.log(payload);
    if (
      !payload.taskCode ||
      !payload.title ||
      !payload.description ||
      !payload.status ||
      !payload.company_id ||
      !payload.companyName ||
      !payload.employeeCode ||
      !payload.employeeName ||
      !payload.employeeEmail
    ) {
      return alert("Please fill all fields");
    } else {
      const { data } = await axios.post(
        "https://taskbackend-7x94.onrender.com/api/task/createTask",
        payload
      );
      if (data) {
        setCreateTaskData({
          taskCode: "",
          title: "",
          description: "",
          status: "",
          company_id: company?.company_id,
          companyName: company?.companyName,
          employeeCode: "",
          employeeName: "",
          employeeEmail: "",
        });
        history.push("/mytask/tasklist");
      }
    }
  };

  let employeeCodeOptions = [];
  let employeeNameOptions = [];
  let employeeEmailOptions = [];
  if (AllEmployees) {
    AllEmployees?.map((i) => {
      return employeeCodeOptions.push({
        value: i.employeeCode,
        label: i.employeeCode,
      });
    });
  }
  if (AllEmployees) {
    AllEmployees?.map((i) => {
      return employeeNameOptions.push({
        value: i.employeeName,
        label: i.employeeName,
      });
    });
  }
  if (AllEmployees) {
    AllEmployees?.map((i) => {
      return employeeEmailOptions.push({
        value: i.employeeEmail,
        label: i.employeeEmail,
      });
    });
  }

  useEffect(() => {
    if (createTaskData.employeeName) {
      const getEmpCodeNameByCode = AllEmployees.find(
        (i) => i.employeeName === createTaskData.employeeName.value
      );
      setCreateTaskData({
        ...createTaskData,
        employeeCode: getEmpCodeNameByCode.employeeCode,
        employeeEmail: getEmpCodeNameByCode.employeeEmail,
      });
      setEmployeeEmail(getEmpCodeNameByCode.employeeEmail);
      setEmployeeCode(getEmpCodeNameByCode.employeeCode);
    } else {
      setCreateTaskData({
        ...createTaskData,
        employeeCode: "",
        employeeEmail: "",
      });
      setEmployeeEmail("");
      setEmployeeCode("");
    }
    // eslint-disable-next-line 
  }, [createTaskData.employeeName]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <form onSubmit={createTask}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: 26,
                      backgroundColor: "#3d6889",
                      color: "white",
                    }}
                  >
                    Create Task
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="taskCode"
                    label="Task Code"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setCreateTaskData({
                        ...createTaskData,
                        taskCode: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="title"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setCreateTaskData({
                        ...createTaskData,
                        title: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setCreateTaskData({
                        ...createTaskData,
                        description: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="status"
                    options={statusOptions}
                    getOptionLabel={(option) => option.label}
                    clearText
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setCreateTaskData({
                        ...createTaskData,
                        status: value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="employeeName"
                    options={employeeNameOptions}
                    getOptionLabel={(option) => option.label}
                    value={
                      employeeName
                        ? { value: employeeName, label: employeeName }
                        : createTaskData.employeeName
                    }
                    clearText
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setCreateTaskData({
                        ...createTaskData,
                        employeeName: value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id="employeeCode"
                    options={employeeCodeOptions}
                    getOptionLabel={(option) => option.label}
                    value={
                      employeeCode
                        ? { value: employeeCode, label: employeeCode }
                        : createTaskData.employeeCode
                    }
                    disabled
                    clearText
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Code"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setCreateTaskData({
                        ...createTaskData,
                        employeeCode: value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    id="employeeEmail"
                    options={employeeEmailOptions}
                    getOptionLabel={(option) => option.label}
                    value={
                      employeeEmail
                        ? { value: employeeEmail, label: employeeEmail }
                        : createTaskData.employeeEmail
                    }
                    disabled
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Email"
                        variant="outlined"
                      />
                    )}
                    onChange={(e, value) => {
                      setCreateTaskData({
                        ...createTaskData,
                        employeeEmail: value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#3d6889",
                      color: "white",
                    }}
                    fullWidth
                    type="submit"
                  >
                    Craete a Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CreateTask;
