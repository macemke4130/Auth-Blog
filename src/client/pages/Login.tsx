import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import renavigateIfLoggedIn from '../utils/renavigate';

const Login = (props: LoginProps) => {
    const [theEmail, setTheEmail] = useState('');
    const [thePassword, setThePassword] = useState('');
    const [theUsername, setTheUsername] = useState('');

    const isAuth = localStorage.getItem("isAuth");
    const history = useHistory();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThePassword(e.target.value);
    }

    const logMeIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
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
        const isAuth = renavigateIfLoggedIn();
        isAuth ? history.push('/profile') : null;
    }, [])

    return (
        <>
            <Nav />
            <h1>Login Page</h1>
            <form>
                <input type="email" placeholder="email" onChange={handleEmailChange}></input>
                <input type="password" placeholder="password" onChange={handlePasswordChange}></input>
                <button onClick={logMeIn}>Login!</button>
            </form>
        </>

    );
};

interface LoginProps { }

export default Login;