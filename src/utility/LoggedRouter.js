import React from "react";
import { Redirect, Route } from 'react-router-dom';
import AuthService from '../service/auth.service';





const LoggedRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        AuthService.getCurrentUser() == null
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default LoggedRouter