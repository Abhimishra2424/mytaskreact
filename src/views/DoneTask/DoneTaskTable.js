import React, { useState } from "react";
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
import { Button, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const DoneTaskTable = () => {
  const { AllTasks } = useAppContext();
  const classes = useStyles();

  const [page, setpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const [selectedData, setSelectedData] = useState({});
  const [open, setOpen] = React.useState(false);

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

    setSelectedData(data);
  };

  const donetask = AllTasks?.filter((i) => i.status === "done");

  const closeTask = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/api/task/taskClose", selectedData);
    console.log(data);
  };

  return (
    <>
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
              <TableCell style={{ color: "white" }} align="right">
                Employee Code
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Task Code
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Status
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Title
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
            {donetask?.length
              ? donetask
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.employee_id}>
                      <TableCell align="right">{row.employeeCode}</TableCell>
                      <TableCell align="right">{row.taskCode}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.title}</TableCell>

                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<CloseIcon />}
                          onClick={(e) => handleEdit(e, row)}
                        >
                          Close
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
          count={donetask?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Edit Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Close Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form onSubmit={closeTask}>
              <Typography
                variant="h6"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Are You Sure Want to delete This task ?
              </Typography>
              <Typography
                variant="h6"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {selectedData.employeeCode} - {selectedData.title}
              </Typography>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" type="submit">
                  Close Task
                </Button>
              </DialogActions>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoneTaskTable;
