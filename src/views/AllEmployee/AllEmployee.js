import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Button, TextField } from "@material-ui/core";


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
import { AllEmpColumns } from "./model";

import { useCallback } from "react";

const AllEmployee = () => {
  const { getAllEmployeescompanyId, AllEmployees, error, editEmployee , iswho } =
    useAppContext();

  const [open, setOpen] = React.useState(false);

  const [selectedData, setSelectedData] = useState({});
  const [passBtn, setPassBtn] = useState(true);


  useEffect(() => {
    if (iswho.trim() === "employee") {
      return; // Early return, no further execution of the hook
    } else {
      getAllEmployeescompanyId();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iswho]);

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
          if (
            window.confirm("Are you sure you want to delete this employee?")
          ) {
            const { data } = await axios.post(
              `https://taskbackend-7x94.onrender.com/api/employee/deleteEmployee`,
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
    },[getAllEmployeescompanyId]);

  const dataForTable = React.useMemo(() => AllEmployees, [AllEmployees]);

  return (
    <>
      <ToastContainer />
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <ReactTableDiv
            handleDelete={handleDelete}
            passBtn={passBtn}
            columns={AllEmpColumns}
            data={dataForTable}
            setSelectedData={setSelectedData}
            handleEdit={handleEdit}
          />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Edit Employee"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <form onSubmit={handleEditEmployee}>
                  <TextField
                    id="outlined-basic"
                    label="Employee Code"
                    variant="outlined"
                    fullWidth
                    value={selectedData.employeeCode}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        employeeCode: e.target.value,
                      })
                    }
                    disabled
                    margin="normal"
                  />

                  <TextField
                    id="outlined-basic"
                    label="Employee Name"
                    variant="outlined"
                    fullWidth
                    value={selectedData.employeeName}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        employeeName: e.target.value,
                      })
                    }
                    margin="normal"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Employee Email"
                    variant="outlined"
                    fullWidth
                    value={selectedData.employeeEmail}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        employeeEmail: e.target.value,
                      })
                    }
                    margin="normal"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Employee Password"
                    variant="outlined"
                    fullWidth
                    value={selectedData.employeePassword}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        employeePassword: e.target.value,
                      })
                    }
                    margin="normal"
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
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
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default AllEmployee;
