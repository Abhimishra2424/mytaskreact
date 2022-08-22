import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAppContext } from '../../context/appContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";


const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));
const CreateTask = () => {
  const classes = useStyles();
  const { company, token } = useAppContext();
  const history = useHistory();
  const [createTaskData, setCreateTaskData] = useState({
    taskCode: '',
    title: '',
    description: '',
    status: '',
    employeeCode: '',
    employeeName: '',
    employeeEmail: '',
  });

  const [company_id, setCompany_id] = useState(null);
  const [companyName, setCompanyName] = useState("")

  const statusOptions = [
    {
      value: 'open',
      label: 'open',
    },
    {
      value: 'in progress',
      label: 'in progress',
    },
    {
      value: 'done',
      label: 'done',
    },
  ]



  useEffect(() => {
    var decoded = jwt_decode(token);
    const companyid = decoded?.payload?.company?.company_id
    setCompany_id(companyid)
    const companyname = decoded?.payload?.company?.companyName
    setCompanyName(companyname)
  }, [token])

  const createTask = async (e) => {
    e.preventDefault();

    let payload = {
      taskCode: createTaskData.taskCode,
      title: createTaskData.title,
      description: createTaskData.description,
      status: createTaskData.status,
      company_id: company_id,
      companyName: companyName,
      employeeCode: createTaskData.employeeCode,
      employeeName: createTaskData.employeeName,
      employeeEmail: createTaskData.employeeEmail,
    }
    if(!payload.taskCode || !payload.title || !payload.description || !payload.status || !payload.company_id || !payload.companyName || !payload.employeeCode || !payload.employeeName || !payload.employeeEmail){
      return alert("Please fill all fields")
    }else{
      const { data } = await axios.post("http://localhost:5000/api/task/createTask", payload)
      if (data) {
        setCreateTaskData({
          taskCode: '',
          title: '',
          description: '',
          status: '',
          company_id: company?.company_id,
          companyName: company?.companyName,
          employeeCode: '',
          employeeName: '',
          employeeEmail: '',
        });
        history.push('/mytask/tasklist');
      }
    }
  }
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
                    }
                    }
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
                    }
                    }
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
                    }
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <TextField
                  id="status"
                  label="Status"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setCreateTaskData({
                      ...createTaskData,
                      status: e.target.value,
                    });
                  }
                  }
                /> */}
                  <Autocomplete
                    id="status"
                    options={statusOptions}
                    getOptionLabel={(option) => option.label}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                    onChange={(e, value) => {
                      setCreateTaskData({
                        ...createTaskData,
                        status: value.value,
                      });
                    }
                    }
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <TextField
                  name="math"
                  id="company_id"
                  label="Company Id"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setCreateTaskData({
                      ...createTaskData,
                      company_id: e.target.value,
                    });
                  }
                  }
                />
              </Grid> */}
                {/* <Grid item xs={12}>
                <TextField
                  id="companyName"
                  label="Company Name"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setCreateTaskData({
                      ...createTaskData,
                      companyName: e.target.value,
                    });
                  }
                  }
                />
              </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    id="employeeCode"
                    label="Employee Code"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setCreateTaskData({
                        ...createTaskData,
                        employeeCode: e.target.value,
                      });
                    }
                    }

                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="employeeName"
                    label="Employee Name"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setCreateTaskData({
                        ...createTaskData,
                        employeeName: e.target.value,
                      });
                    }
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="employeeEmail"
                    label="Employee Email"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setCreateTaskData({
                        ...createTaskData,
                        employeeEmail: e.target.value,
                      });
                    }
                    }
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
  )
}

export default CreateTask