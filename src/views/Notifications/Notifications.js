import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { useAppContext } from "../../context/appContext";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(employeeCode, taskCode, employeeName, employeeEmail) {
  return {
    employeeCode,
    taskCode,
    employeeName,
    employeeEmail,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    const response = await axios.post(
      `https://web-production-e9b1.up.railway.app/api/task/getTaskHistoryCompanyId/${row.taskCode}`
    );
    setDataHistory(response.data);
    setLoading(false);
  };

  const handleClick = () => {
    setLoading(true);
    setOpen(!open);
    fetchHistory()
    setLoading(false);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.employeeCode}
        </TableCell>
        <TableCell align="right">{row.taskCode}</TableCell>
        <TableCell align="right">{row.employeeName}</TableCell>
        <TableCell align="right">{row.employeeEmail}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "red",
                      }}
                    >
                      Updated
                    </TableCell>
                    <TableCell
                      style={{
                        color: "green",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Title</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={2}>Loading...</TableCell>
                    </TableRow>
                  ) : (
                    dataHistory.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.updatedAt}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.title}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Notifications() {
  const { getAllTaskByCompanyId, AllTasks } = useAppContext();

  const rows = AllTasks.map((row) =>
    createData(
      row.employeeCode,
      row.taskCode,
      row.employeeName,
      row.employeeEmail
    )
  );

  useEffect(() => {
    getAllTaskByCompanyId();
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Employee Code</TableCell>
            <TableCell align="right">Task Code</TableCell>
            <TableCell align="right">Employee Name</TableCell>
            <TableCell align="right">Employee Email </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
