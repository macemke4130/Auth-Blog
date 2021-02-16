import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Nav from '../components/Nav';
import apiService from '../utils/api-service';

const Login = (props: LoginProps) => {
    const [theEmail, setTheEmail] = useState('');
    const [thePassword, setThePassword] = useState('');
    const [theUsername, setTheUsername] = useState('');

    const isAuth = localStorage.getItem("isAuth");
    const history = useHistory();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThePassword(e.target.value);
    }

    const logMeIn = async () => {
        const bodyObject = {
            email: theEmail,
            password: thePassword
        }

        const token = await apiService("/auth/login/", "POST", bodyObject);
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('isAuth', "true");
            history.push('/profile');
        } else {
            console.log("Fail.");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Renavigate. Already logged in.");
            //history.push('/');
        }
    }, [])

    return (
        <>
            <Nav />
            <h1>Login Page</h1>
            <input type="email" placeholder="email" onChange={handleEmailChange}></input>
            <input type="password" placeholder="password" onChange={handlePasswordChange}></input>
            <button onClick={logMeIn}>Login!</button>
        </>

    );
};

interface LoginProps { }

export default Login;