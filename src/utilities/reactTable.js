import React from 'react'
import { useTable } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Button } from '@material-ui/core'
import EditIcon from "@material-ui/icons/Edit";

const ReactTableDiv = ({ columns, data, setSelectedData, passBtn, handleDelete , handleEditEmployee  , handleEdit}) => {

    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
        },
        hooks => {
            hooks.allColumns.push(columns => [
                {
                    id: 'Edit',
                    Header: "Action",
                    Cell: ({ row }) => {
                        return (
                            <>
                                {passBtn ? <Button
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    size="small"
                                    onClick={(e) => handleEdit(e, row.original)}>Edit</Button> : null}

                                {passBtn ? <Button
                                    color="secondary"
                                    startIcon={<EditIcon />}
                                    size="small"
                                    onClick={(e) => handleDelete(e, row.original)}>Delete</Button> : null}
                            </>
                        )
                    }
                },
                ...columns,
            ])
        }
    )


    // Render the UI for your table
    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {

                    prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </MaUTable>
    )
}

export default ReactTableDiv