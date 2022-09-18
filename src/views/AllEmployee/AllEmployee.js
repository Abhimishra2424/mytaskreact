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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ErrorPage from "../../components/ErrorPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReactTableDiv from "../../utilities/reactTable";
import { AllEmpColumns } from './model'


import CssBaseline from '@material-ui/core/CssBaseline'
import { useCallback } from "react";


const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const AllEmployee = () => {
  const { getAllEmployeescompanyId, AllEmployees, error, editEmployee } = useAppContext();
  const classes = useStyles();
  // const [selectedData, setSelectedData] = useState({})

  const [page, setpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const [open, setOpen] = React.useState(false);

  const [selectedData, setSelectedData] = useState({});
  const [passBtn, setPassBtn] = useState(true)

  useEffect(() => {
    getAllEmployeescompanyId();
    // eslint-disable-next-line 
  }, []);

  // const handleChangePage = (event, newPage) => {
  //   setpage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setrowsPerPage(+event.target.value);
  //   setpage(0);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e, data) => {
    setOpen(true);
    setSelectedData(data);
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    editEmployee(selectedData);
    setOpen(false);
    toast.success("Employee Edited Successfully");
  };

  const handleDelete = useCallback((e, data) => {
    e.preventDefault();
    async function deleteEmp() {
      try {
        const employee_id = data.employee_id;
        if (window.confirm("Are you sure you want to delete this employee?")) {
          const { data } = await axios.post(
            `https://taskmaganer-apis-nodejs.herokuapp.com/api/employee/deleteEmployee`,
            { employee_id }
          );
          toast.success(`${data.msg}`);
          getAllEmployeescompanyId();
        }
      } catch (error) {
        console.error(error);
      }
    }
    deleteEmp();

    // const employee_id = data.employee_id;
    // console.log('employee_id', employee_id)
    // if (window.confirm("Are you sure you want to delete this employee?")) {
    //   const { data } = axios.post(
    //     `https://taskmaganer-apis-nodejs.herokuapp.com/api/employee/deleteEmployee`,
    //     { employee_id }
    //   );
    //   toast.success(`${data.msg}`);
    //   getAllEmployeescompanyId();
    // }
  }, [getAllEmployeescompanyId])




  const dataForTable = React.useMemo(() => AllEmployees, [AllEmployees])

  return (
    <>
      <ToastContainer />
      {error ? (
        <ErrorPage error={error} />
      ) : (

        // <TableContainer component={Paper}>
        //   <Table className={classes.table} aria-label="simple table">
        //     <TableHead>
        //       <TableRow
        //         style={{
        //           backgroundColor: "#3D6889",
        //           fontWeight: "bold",
        //           fontSize: "1.2rem",
        //         }}
        //       >
        //         <TableCell
        //           style={{
        //             color: "white",
        //           }}
        //           align="right"
        //         >
        //           Employee Code
        //         </TableCell>
        //         <TableCell
        //           style={{
        //             color: "white",
        //           }}
        //           align="right"
        //         >
        //           Employee Name
        //         </TableCell>
        //         <TableCell
        //           style={{
        //             color: "white",
        //           }}
        //           align="right"
        //         >
        //           Employee Email
        //         </TableCell>
        //         <TableCell
        //           style={{
        //             color: "white",
        //           }}
        //           align="right"
        //         >
        //           Employee Password
        //         </TableCell>
        //         <TableCell
        //           style={{
        //             color: "white",
        //           }}
        //           align="right"
        //         >
        //           Employee Role
        //         </TableCell>
        //         <TableCell
        //           style={{
        //             color: "white",
        //           }}
        //           align="right"
        //         >
        //           Action
        //         </TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {AllEmployees?.length
        //         ? AllEmployees?.slice(
        //             page * rowsPerPage,
        //             page * rowsPerPage + rowsPerPage
        //           ).map((row) => (
        //             <TableRow key={row.employee_id}>
        //               <TableCell align="right">{row.employeeCode}</TableCell>
        //               <TableCell align="right">{row.employeeName}</TableCell>
        //               <TableCell align="right">{row.employeeEmail}</TableCell>
        //               <TableCell align="right">
        //                 {row.employeePassword}
        //               </TableCell>
        //               <TableCell align="right">{row.employeeRole}</TableCell>
        //               <TableCell
        //                 align="right"
        //                 style={{
        //                   display: "flex",
        //                   alignItems: "center",
        //                   justifyContent: "center",
        //                 }}
        //               >
        //                 <Button
        //                   variant="outlined"
        //                   color="primary"
        //                   startIcon={<EditIcon />}
        //                   size="small"
        //                   style={{
        //                     marginLeft: "5px",
        //                     fontSize: "10px",
        //                   }}
        //                   onClick={(e) => handleEdit(e, row)}
        //                 >
        //                   Edit Employee
        //                 </Button>
        //                 <Button
        //                   color="secondary"
        //                   variant="outlined"
        //                   size="small"
        //                   style={{
        //                     fontSize: "10px",
        //                   }}
        //                   onClick={(e) => handleDelete(e, row)}
        //                 >
        //                   Delete Employee
        //                 </Button>
        //               </TableCell>
        //             </TableRow>
        //           ))
        //         : "no data"}
        //     </TableBody>
        //   </Table>
        //   <TablePagination
        //     rowsPerPageOptions={[5, 10, 25]}
        //     component="div"
        //     count={AllEmployees?.length}
        //     rowsPerPage={rowsPerPage}
        //     page={page}
        //     onChangePage={handleChangePage}
        //     onChangeRowsPerPage={handleChangeRowsPerPage}
        //   />

        //   {/* Edit Modal */}
        //   <Dialog
        //     open={open}
        //     onClose={handleClose}
        //     aria-labelledby="alert-dialog-title"
        //     aria-describedby="alert-dialog-description"
        //   >
        //     <DialogTitle id="alert-dialog-title">{"Edit Employee"}</DialogTitle>
        //     <DialogContent>
        //       <DialogContentText id="alert-dialog-description">
        //         <form onSubmit={handleEditEmployee}>
        //           <TextField
        //             id="outlined-basic"
        //             label="Employee Code"
        //             variant="outlined"
        //             fullWidth
        //             value={selectedData.employeeCode}
        //             onChange={(e) =>
        //               setSelectedData({
        //                 ...selectedData,
        //                 employeeCode: e.target.value,
        //               })
        //             }
        //             disabled
        //             margin="normal"
        //           />

        //           <TextField
        //             id="outlined-basic"
        //             label="Employee Name"
        //             variant="outlined"
        //             fullWidth
        //             value={selectedData.employeeName}
        //             onChange={(e) =>
        //               setSelectedData({
        //                 ...selectedData,
        //                 employeeName: e.target.value,
        //               })
        //             }
        //             margin="normal"
        //           />
        //           <TextField
        //             id="outlined-basic"
        //             label="Employee Email"
        //             variant="outlined"
        //             fullWidth
        //             value={selectedData.employeeEmail}
        //             onChange={(e) =>
        //               setSelectedData({
        //                 ...selectedData,
        //                 employeeEmail: e.target.value,
        //               })
        //             }
        //             margin="normal"
        //           />
        //           <TextField
        //             id="outlined-basic"
        //             label="Employee Password"
        //             variant="outlined"
        //             fullWidth
        //             value={selectedData.employeePassword}
        //             onChange={(e) =>
        //               setSelectedData({
        //                 ...selectedData,
        //                 employeePassword: e.target.value,
        //               })
        //             }
        //             margin="normal"
        //           />

        //           <Button
        //             variant="contained"
        //             fullWidth
        //             type="submit"
        //             color="primary"
        //           >
        //             Update
        //           </Button>
        //         </form>
        //       </DialogContentText>
        //     </DialogContent>
        //     <DialogActions>
        //       <Button onClick={handleClose} color="primary">
        //         Cancel
        //       </Button>
        //       {/* <Button onClick={handleClose} color="primary" autoFocus>
        //         Save
        //       </Button> */}
        //     </DialogActions>
        //   </Dialog>
        // </TableContainer>

        <ReactTableDiv
          handleDelete={handleDelete}
          passBtn={passBtn}
          columns={AllEmpColumns}
          data={dataForTable}
          setSelectedData={setSelectedData}
        />
      )}
    </>
  );
};

export default AllEmployee;
