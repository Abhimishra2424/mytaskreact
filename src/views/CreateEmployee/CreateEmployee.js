import { Box, Button, Container, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';


const CreateEmployee = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Create Employee</Typography>
                <Paper >
                    <Box p={2}>
                        <div className="mb-12 lg:mb-0">
                            <div className="block">
                                <form >
                                    <TextField
                                        id="companyName"
                                        label="Company Name*"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    //   value={companyData.companyName}
                                    //   onChange={(e) =>
                                    //     setCompanyData({
                                    //       ...companyData,
                                    //       companyName: e.target.value,
                                    //     })
                                    //   }


                                    />
                                    <TextField
                                        id="companyEmail"
                                        label="Company Email*"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type={"email"}
                                    //   value={companyData.companyEmail}
                                    //   onChange={(e) =>
                                    //     setCompanyData({
                                    //       ...companyData,
                                    //       companyEmail: e.target.value,
                                    //     })
                                    //   }

                                    />
                                    <TextField
                                        id="companyPassword"
                                        label="Company Password*"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="password"
                                    //   value={companyData.companyPassword}
                                    //   onChange={(e) =>
                                    //     setCompanyData({
                                    //       ...companyData,
                                    //       companyPassword: e.target.value,
                                    //     })
                                    //   }

                                    />
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type="submit"
                                    //   className={classes.button}
                                    //   disabled={isLoading}
                                    >
                                        Add new Employee
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Box>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateEmployee