import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {

 const token = localStorage.getItem('token');
 console.log(token);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
}