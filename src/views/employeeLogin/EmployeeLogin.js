import { Box, Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useAppContext } from '../../context/appContext';
import { useHistory } from "react-router-dom"

const EmployeeLogin = () => {
  const { employeeLogin } =
    useAppContext()
  const history = useHistory();

  const [employeeLoginData, setEmployeeLoginData] = useState({
    employeeEmail: '',
    employeePassword: ''
  })

  const handleEmployeeLogin = (e) => {
    e.preventDefault()
    if (!employeeLoginData.employeeEmail || !employeeLoginData.employeePassword) {
      toast.error("Please fill all the fields required");
    } else {
      employeeLogin({ employeeEmail: employeeLoginData.employeeEmail, employeePassword: employeeLoginData.employeePassword })
      history.push("/mytask");
    }
  }

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Box
        boxShadow={2}
        height="60vh"
      >
        <div class="container my-24 px-6 mx-auto">

          <section class="mb-32 text-center text-gray-800">
            <div class="max-w-[700px] mx-auto px-3 lg:px-6">
              <h6 class="text-1xl mb-12">Employee Login Page </h6>
              <form onSubmit={handleEmployeeLogin}>
                <div class="form-group mb-6">
                  <TextField
                    id="EmployeeEmail"
                    label="EmployeeEmail*"
                    variant="outlined"
                    size="small"
                    className="mb-6"
                    fullWidth
                    value={employeeLoginData.employeeEmail}
                    onChange={(e) => setEmployeeLoginData({ ...employeeLoginData, employeeEmail: e.target.value })}

                  />
                </div>
                <div class="form-group mb-6">
                  <TextField
                    id="EmployeePassword"
                    label="EmployeePassword*"
                    variant="outlined"
                    size="small"
                    className="mb-6"
                    fullWidth
                    value={employeeLoginData.employeePassword}
                    onChange={(e) => setEmployeeLoginData({ ...employeeLoginData, employeePassword: e.target.value })}

                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  type='submit'

                >Employee Login</Button>
              </form>
            </div>
          </section>
        </div>
      </Box>
    </Container>
  )
}

export default EmployeeLogin