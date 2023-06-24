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
import { useAppContext } from "../../context/appContext";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

const useStyles = makeStyles({
    table: {
        minWidth: 450,
    },
});


const AssignTask = () => {
    const { getAllTaskByEmployeeCode, AllassignedTasks, } = useAppContext();
    const classes = useStyles();

    const [page, setpage] = useState(0);
    const [rowsPerPage, setrowsPerPage] = useState(5);

    const [open, setOpen] = React.useState(false);

    const [selectedData, setSelectedData] = useState({})


    useEffect(() => {
        getAllTaskByEmployeeCode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangePage = (event, newPage) => {
        setpage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setrowsPerPage(+event.target.value);
        setpage(0);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (e, data) => {
        setOpen(true);
        setSelectedData(data)
    }
    const updateTask = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("https://taskbackend-7x94.onrender.com/api/task/updateTask", selectedData)
        if (data) {
            setOpen(false);
            getAllTaskByEmployeeCode();
        }
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
                            taskCode
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            title
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            status
                        </TableCell>
                        <TableCell
                            style={{
                                color: "white",
                            }}
                            align="right"
                        >
                            description
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
                    {AllassignedTasks?.AllassignedTasks?.length
                        ? AllassignedTasks?.AllassignedTasks
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.employee_id}>
                                    <TableCell align="right">{row.taskCode}</TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"

                                            startIcon={<EditIcon />}
                                            onClick={(e) => handleEdit(e, row)}
                                        >
                                            Edit Task
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
                count={AllassignedTasks?.AllassignedTasks?.length}
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
                <DialogTitle id="alert-dialog-title">{"Edit Your Task"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form>
                            <TextField
                                id="outlined-basic"
                                label="taskCode"
                                fullWidth
                                value={selectedData.taskCode}
                                onChange={(e) => setSelectedData({ ...selectedData, taskCode: e.target.value })}
                                disabled
                                margin="normal"
                            />

                            <TextField
                                id="outlined-basic"
                                label="title"
                                fullWidth
                                margin="normal"
                                value={selectedData.title}
                                onChange={(e) => setSelectedData({ ...selectedData, title: e.target.value })}
                            />
                            <TextField
                                id="outlined-basic"
                                label="status"
                                fullWidth
                                margin="normal"
                                value={selectedData.status}
                                onChange={(e) => setSelectedData({ ...selectedData, status: e.target.value })}

                            />
                            <TextField
                                id="outlined-basic"
                                label="description"
                                fullWidth
                                margin="normal"
                                value={selectedData.description}
                                onChange={(e) => setSelectedData({ ...selectedData, description: e.target.value })}

                            />

                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                color='primary'
                                onClick={(e) => updateTask(e)}
                            >
                                Update Your Task
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
    )
}

export default AssignTask