import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

export default function companyLogin() {
  
  return (
    <div class="container my-24 px-6 mx-auto">

      <section class="mb-32 text-center text-gray-800">
        <div class="max-w-[700px] mx-auto px-3 lg:px-6">
          <h6 class="text-1xl mb-12">If Your Are Admin on Company Then login with Company Email or If your are empoylee then login with Empoylee Email</h6>
          <form> 
            <div class="form-group mb-6">
              <TextField
                id="email"
                label="email"
                variant="outlined"
                size="small"
                className="mb-6"
                required
                fullWidth

              />
            </div>
            <div class="form-group mb-6">
              <TextField
                id="password"
                label="password"
                variant="outlined"
                size="small"
                className="mb-6"
                required
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >Login</Button>
          </form>
        </div>
      </section>
    </div>
  );
}