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
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles({
    table: {
        minWidth: 450,
    },
});

const AllEmployee = () => {
    const { company } = useAppContext();
    const classes = useStyles();

    const [data, setdata] = useState([])
    const [page, setpage] = useState(0);
    const [rowsPerPage, setrowsPerPage] = useState(5);

    useEffect(() => {
        const getAllemployee = async () => {
            let payload = {
                company_id: company.company_id
            }
            const { data } = await axios.post("http://localhost:5000/api/company/getAllEmployeeByCompanyId", payload);
            console.log(data)
            setdata(data.employees);
        }
        getAllemployee();
    }, [company.company_id])

    const handleChangePage = (event, newPage) => {
        setpage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setrowsPerPage(+event.target.value);
        setpage(0);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow 
                        style={{
                            backgroundColor: "#f5f5f5",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            color: "#000"

                        }}

                    >
                        <TableCell align="right">Employee Id</TableCell>
                        <TableCell align="right">Employee Name</TableCell>
                        <TableCell align="right">Employee Email</TableCell>
                        <TableCell align="right">Employee Role</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.length
                        ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow key={row.employee_id}>
                                <TableCell align="right">{row.employee_id}</TableCell>
                                <TableCell align="right">{row.employeeName}</TableCell>
                                <TableCell align="right">{row.employeeEmail}</TableCell>
                                <TableCell align="right">{row.employeeRole}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/employee/${row.employee_id}`}>
                                        <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
                                            Edit
                                        </Button>
                                    </Link>
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
        </TableContainer>
    );
};

export default AllEmployee;
