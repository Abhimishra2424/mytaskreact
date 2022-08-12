import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useAppContext } from '../../context/appContext';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function CustomizedInputBase() {
    const classes = useStyles();
    const { getTaskSearchParam } = useAppContext();

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue.length > 0) {
            getTaskSearchParam(searchValue)
        }
    },[searchValue])

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search Task..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconButton type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    getTaskSearchParam(searchValue)
                }
                }
                className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}