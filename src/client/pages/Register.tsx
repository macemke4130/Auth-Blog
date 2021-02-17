import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import renavigateIfLoggedIn from '../utils/renavigate';

const Register = (props: RegisterProps) => {
    const [theEmail, setTheEmail] = useState('');
    const [thePassword, setThePassword] = useState('');
    const [theUsername, setTheUsername] = useState('');

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

    const logMeIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const bodyObject = {
            email: theEmail,
            password: thePassword,
            username: theUsername
        }

        const token = await apiService("/auth/register/", "POST", bodyObject);
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('isAuth', 'true');
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
            <h1>Register Page</h1>
            <form>
                <input type="email" placeholder="email" onChange={handleEmailChange}></input>
                <input type="text" placeholder="username" onChange={handleUsernameChange}></input>
                <input type="password" placeholder="password" onChange={handlePasswordChange}></input>
                <button onClick={logMeIn}>Register!</button>
            </form>
        </>

    );
};

interface RegisterProps { }

export default Register;
