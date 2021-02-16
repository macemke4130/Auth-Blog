import * as React from 'react';
import { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props: PrivateRouteProps) => {
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <Route exact={props.exact} path={props.path}>
                {props.children}
            </Route>
        );
    } else {
        return (
            <Redirect to="/login" />
        );
    }
};

interface PrivateRouteProps {
    exact?: boolean,
    path: string,
    children: React.ReactNode
}

export default PrivateRoute;