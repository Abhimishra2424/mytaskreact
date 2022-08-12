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
import CustomizedInputBase from "../../components/Search/Search";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});


export default function TableList() {
  const { getAllEmployeescompanyId, AllEmployees, getAllTaskByCompanyId, AllTasks } = useAppContext();
  const classes = useStyles();

  const [page, setpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const [open, setOpen] = React.useState(false);

  const [selectedData, setSelectedData] = useState({})


  useEffect(() => {
    getAllEmployeescompanyId()
    getAllTaskByCompanyId()
  }, []);

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

  const handleEdit = (e, data) => {
    console.log(data)
    setOpen(true);
    setSelectedData(data)
  }



  return (
    <>
    <CustomizedInputBase />
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
            <TableCell style={{ color: "white" }} align="right">Employee Code</TableCell>
            <TableCell style={{ color: "white" }} align="right">Task Code</TableCell>
            <TableCell style={{ color: "white" }} align="right">Status</TableCell>
            <TableCell style={{ color: "white" }} align="right">Title</TableCell>
            <TableCell style={{ color: "white" }} align="right">Description</TableCell>
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
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AllTasks?.length
            ? AllTasks
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.employee_id}>
                  <TableCell align="right">{row.employeeCode}</TableCell>
                  <TableCell align="right">{row.taskCode}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.employeeName}</TableCell>
                  <TableCell align="right">{row.employeeEmail}</TableCell>

                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={(e) => handleEdit(e, row)}
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
        count={AllEmployees?.length}
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
                autoFocus
                margin="dense"
                id="employeeCode"
                label="Employee Code"
                type="text"
                fullWidth
                value={selectedData.employeeCode}
                onChange={(e) => setSelectedData({ ...selectedData, employeeCode: e.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="taskCode"
                label="Task Code"
                type="text"
                fullWidth
                value={selectedData.taskCode}
                onChange={(e) => setSelectedData({ ...selectedData, taskCode: e.target.value })}
              />
              <TextField

                autoFocus
                margin="dense"
                id="status"
                label="Status"
                type="text"
                fullWidth
                value={selectedData.status}
                onChange={(e) => setSelectedData({ ...selectedData, status: e.target.value })}
              />
              <TextField

                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                value={selectedData.title}
                onChange={(e) => setSelectedData({ ...selectedData, title: e.target.value })}
              />
              <TextField

                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={selectedData.description}
                onChange={(e) => setSelectedData({ ...selectedData, description: e.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="employeeName"
                label="Employee Name"
                type="text"
                fullWidth
                value={selectedData.employeeName}
                onChange={(e) => setSelectedData({ ...selectedData, employeeName: e.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="employeeEmail"
                label="Employee Email"
                type="text"
                fullWidth
                value={selectedData.employeeEmail}
                onChange={(e) => setSelectedData({ ...selectedData, employeeEmail: e.target.value })}
              />


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
    </>
  );
}
