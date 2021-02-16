import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const Login = (props: LoginProps) => {
    const [theEmail, setTheEmail] = useState('');
    const [thePassword, setThePassword] = useState('');

    const history = useHistory();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThePassword(e.target.value);
    }

    const logMeIn = async () => {
        const bodyObject = {
            email: theEmail,
            password: thePassword
        }
        const myMethod = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(bodyObject)
        }
        try{
            const r = await fetch("/auth/login/", myMethod);
            if(r.ok) {
                let token = await r.json();
                console.log("RESPONSE FROM SERVER: " + token);
            } else {
                throw new Error('Failed');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h1>Login Page</h1>
            <input type="email" placeholder="email" onChange={handleEmailChange}></input>
            <input type="password" placeholder="password" onChange={handlePasswordChange}></input>
            <button onClick={logMeIn}>Login!</button>
        </>

    );
};

interface LoginProps { }

export default Login;
