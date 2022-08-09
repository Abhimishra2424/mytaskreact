import { Box, Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useAppContext } from '../../context/appContext';
import { useHistory } from "react-router-dom"

const CompanyLogin = () => {
  const { loginCompany } =
    useAppContext()
    const history = useHistory();
  const [companyLoginData, setCompanyLoginData] = useState({
    companyEmail: '',
    companyPassword: ''
  })

  const handleComanyLogin = (e) => {
    e.preventDefault()
    if (!companyLoginData.companyEmail || !companyLoginData.companyPassword) {
      toast.error("Please fill all the fields required");
    } else {
      loginCompany({ companyEmail: companyLoginData.companyEmail, companyPassword: companyLoginData.companyPassword })
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
              <h6 class="text-1xl mb-12">Company Login Page </h6>
              <form onSubmit={handleComanyLogin}>
                <div class="form-group mb-6">
                  <TextField
                    id="CompanyEmail"
                    label="CompanyEmail*"
                    variant="outlined"
                    size="small"
                    className="mb-6"
                    fullWidth
                    value={companyLoginData.companyEmail}
                    onChange={(e) => setCompanyLoginData({ ...companyLoginData, companyEmail: e.target.value })}

                  />
                </div>
                <div class="form-group mb-6">
                  <TextField
                    id="CompanyPassword"
                    label="CompanyPassword*"
                    variant="outlined"
                    size="small"
                    className="mb-6"
                    fullWidth
                    value={companyLoginData.companyPassword}
                    onChange={(e) => setCompanyLoginData({ ...companyLoginData, companyPassword: e.target.value })}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  type='submit'

                >Company Login</Button>
              </form>
            </div>
          </section>
        </div>
      </Box>
    </Container>
  )
}

export default CompanyLogin