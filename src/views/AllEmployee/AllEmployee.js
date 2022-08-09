import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/appContext";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
    table: {
        minWidth: 450,
    },
});

const AllEmployee = () => {
    const { company } = useAppContext();
    const classes = useStyles();

    const [data, setdata] = useState([]);
    const [page, setpage] = useState(0);
    const [rowsPerPage, setrowsPerPage] = useState(5);

    const [open, setOpen] = React.useState(false);

const [selectedData, setSelectedData] = useState({})


    useEffect(() => {
        const getAllemployee = async () => {
            let payload = {
                company_id: company.company_id,
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/employee/getAllEmployeeByCompanyId",
                payload
            );
            console.log(data);
            setdata(data.employees);
        };
        getAllemployee();
    }, [company.company_id]);

    const handleChangePage = (event, newPage) => {
        setpage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setrowsPerPage(+event.target.value);
        setpage(0);
    };


    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (e , data) =>{
        console.log(data)
        setOpen(true);
        setSelectedData(data)
    }



    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow
                        style={{
                            backgroundColor: "#3D6889",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                        }}
                    >
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            Employee Code
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            Employee Name
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            Employee Email
                         </TableCell>
                         <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            Employee Password
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            Employee Role
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.length
                        ? data
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.employee_id}>
                                    <TableCell align="right">{row.employeeCode}</TableCell>
                                    <TableCell align="right">{row.employeeName}</TableCell>
                                    <TableCell align="right">{row.employeeEmail}</TableCell>
                                    <TableCell align="right">{row.employeePassword}</TableCell>
                                    <TableCell align="right">{row.employeeRole}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={(e)=>handleEdit(e, row)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        : "no data"}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

            {/* Edit Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Edit Employee"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form >
                            <TextField
                                id="outlined-basic"
                                label="Employee Code"
                                variant="outlined"
                                fullWidth
                                value={selectedData.employeeCode}
                                onChange={(e)=>setSelectedData({...selectedData, employeeCode: e.target.value})}
                                disabled

                                margin="normal"
                            />

                            <TextField
                                id="outlined-basic"
                                label="Employee Name"
                                variant="outlined"
                                fullWidth
                                value={selectedData.employeeName}
                                onChange={(e)=>setSelectedData({...selectedData, employeeName: e.target.value})}
                                margin="normal"
                            />
                            <TextField
                                id="outlined-basic"
                                label="Employee Email"

                                variant="outlined"
                                fullWidth
                                value={selectedData.employeeEmail}
                                onChange={(e)=>setSelectedData({...selectedData, employeeEmail: e.target.value})}
                                margin="normal"

                            />
                            <TextField
                                id="outlined-basic"
                                label="Employee Password"
                                variant="outlined"
                                fullWidth
                                value={selectedData.employeePassword}
                                onChange={(e)=>setSelectedData({...selectedData, employeePassword: e.target.value})}
                                margin="normal"


                            />
                           
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                color='primary'
                            >
                                Update
                            </Button>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default AllEmployee;
