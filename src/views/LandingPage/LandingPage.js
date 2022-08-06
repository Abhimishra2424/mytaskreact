import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import RealMeLogo from '../../../src/realbooks.png'


const useStyles = makeStyles({
    button: {
        background: '#304ED8',
        color: '#fff',
        '&:hover': {
            background: '#3D5AFE',
        },
    }
});

export default function LandingPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div>
                <section className="mb-40">
                    <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
                        <div className="px-6 w-full flex flex-wrap items-center justify-between">
                            <div className="flex items-center">

                                <Link className="navbar-brand text-blue-600" to="/">
                                    <img src={RealMeLogo} alt="RealMe" style={{
                                        width: '40px',
                                        height: '40px',
                                    }}
                                    />
                                </Link>
                            </div>
                            <div className="flex items-center lg:ml-auto">
                                <Button
                                    type="button"
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<LockOpenIcon />}
                                ><Link to="/login">Login</Link></Button>
                            </div>
                        </div>
                    </nav>

                    <div className="text-center bg-gray-50 text-gray-800 py-24 px-6">
                        <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"> Adansa <br /><span className="text-blue-600"> Adansa Task Management System . </span></h1>
                        <Button
                            variant="contained"
                            className={classes.button}
                        >
                            <Link to="/company-register">Create Company</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
}