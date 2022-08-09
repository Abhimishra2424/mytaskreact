import { Box, Button, TextField, Typography, } from '@material-ui/core'
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'



const CreateEmployee = () => {
    const { company } = useAppContext();
    const [employeeData, setEmployeeData] = useState({
        employeeCode: "",
        employeeName: '',
        employeeEmail: '',
        employeePassword: "",
        employeeRole: "",
        company_id: "",
        companyName: ""

    })
    const history = useHistory()
    const EmployeeRole = [
        {
            value: 'employee',
            label: 'employee'
        },
        {
            value: 'subAdmin',
            label: 'subAdmin'
        }

    ]

    const createEmployee = async (e) => {
        e.preventDefault();
        if (!employeeData.employeeName || !employeeData.employeeEmail || !employeeData.employeePassword || !employeeData.employeeRole || !employeeData.employeeCode) {
            return toast.error("Please fill all the fields required");
        }
        let payload = {
            employeeCode: employeeData.employeeCode,
            employeeName: employeeData.employeeName,
            employeeEmail: employeeData.employeeEmail,
            employeePassword: employeeData.employeePassword,
            employeeRole: employeeData.employeeRole,
            company_id: company.company_id,
            companyName: company.companyName
        }

        const { data } = await axios.post("http://localhost:5000/api/employee/createemployee", payload)
        if (data.msg === "Employee registered") {
            toast.success(data.msg)
            setEmployeeData({
                employeeCode: "",
                employeeName: '',
                employeeEmail: '',
                employeePassword: "",
                employeeRole: "",
            })
            history.push("/mytask/AllEmployee")
        }
    }

    return (
        <Grid container spacing={2}>
            <ToastContainer />
            <Grid item xs={12}>
                <Typography>Create Employee</Typography>
                <Paper >
                    <Box p={2}>
                        <div className="mb-12 lg:mb-0">
                            <div className="block">
                                <form onSubmit={createEmployee}>
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
                                </form>
                            </div>
                        </div>
                    </Box>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateEmployee