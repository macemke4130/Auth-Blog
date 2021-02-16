import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

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

    const logMeIn = async () => {
        const bodyObject = {
            email: theEmail,
            password: thePassword,
            username: theUsername
        }
        const myMethod = {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(bodyObject)
        }
        try{
            const r = await fetch("/auth/register/", myMethod);
            if(r.ok) {
                const token = await r.json();
                localStorage.setItem('token', token);
            } else {
                throw new Error('Failed');
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            console.log("Renavigate. Already logged in.");
            //history.push('/');
        }
    }, [])

    return (
        <>
            <h1>Register Page</h1>
            <input type="email" placeholder="email" onChange={handleEmailChange}></input>
            <input type="text" placeholder="username" onChange={handleUsernameChange}></input>
            <input type="password" placeholder="password" onChange={handlePasswordChange}></input>
            <button onClick={logMeIn}>Register!</button>
        </>

    );
};

interface RegisterProps { }

export default Register;
