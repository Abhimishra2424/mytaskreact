import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import RealMeLogo from '../../../src/realbooks.png'
;

export default function LandingPage() {
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
                            <div className="flex items-center lg:ml-auto ">
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                     style={{
                                        marginRight: '10px',
                                     }}
                                    startIcon={<LockOpenIcon />}
                                ><Link  
                                 style={{
                                    color: 'white',
                                 }}
                                to="/company-login">Company Login</Link></Button>

                                 <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<LockOpenIcon />}
                                ><Link  
                                style={{
                                    color: 'white',
                                 }}
                                to="/employee-login">Employee Login</Link></Button>
                               
                            </div>
                            
                        </div>
                    </nav>

                    <div className="text-center bg-gray-50 text-gray-800 py-24 px-6">
                        <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"> Adansa <br /><span className="text-blue-600"> Adansa Task Management System . </span></h1>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                         <Link  
                             style={{
                                color: 'white',
                             }}
                         to="/company-register">Create Company</Link>  
                        </Button>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
}