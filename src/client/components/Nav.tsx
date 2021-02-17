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
            <Link to="/"><button className="btn btn-primary">Home</button></Link>
            {isAuth ? <Link to="/compose"><button className="btn btn-primary">Compose</button></Link> : "" }
            {isAuth ? <Link to="/profile"><button className="btn btn-primary">Profile</button></Link> : "" }
            {isAuth ? "" : <Link to="/register"><button className="btn btn-primary">Register</button></Link> }
            {isAuth ? "" : <Link to="/login"><button className="btn btn-primary">LogIn</button></Link> }
            {isAuth ? <button className="btn btn-primary" onClick={handleLogout}>Logout</button> : "" }
        </nav>
    );

};

interface NavProps {}

export default Nav;