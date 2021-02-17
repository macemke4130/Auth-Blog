import * as React from 'react';
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'

const Nav = (props: NavProps) => {
    // LocalStorage only stores String Types.
    // This sets them to Booleans so that I can use cleaner ternarys below.
    // I know I could look for the Token, but this made more sense to me --
    let isAuth: string | boolean = localStorage.getItem("isAuth");
    if (isAuth === "true"){isAuth = true};
    if (isAuth === "false"){isAuth = false};

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuth", "false");
        history.push("/login");
    }

    return (
        <nav className="d-flex justify-content-center mb-2">
            <Link to="/"><button className="btn btn-primary m-2">Home</button></Link>
            {isAuth ? <Link to="/compose"><button className="btn btn-primary m-2">Compose</button></Link> : "" }
            {isAuth ? <Link to="/profile"><button className="btn btn-primary m-2">Profile</button></Link> : "" }
            {isAuth ? "" : <Link to="/register"><button className="btn btn-primary m-2">Register</button></Link> }
            {isAuth ? "" : <Link to="/login"><button className="btn btn-primary m-2">Log In</button></Link> }
            {isAuth ? <button className="btn btn-primary m-2" onClick={handleLogout}>Log Out</button> : "" }
        </nav>
    );

};

interface NavProps {}

export default Nav;