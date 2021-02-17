import * as React from 'react';
import { useState, useEffect } from "react";
import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

const Profile = (props: ProfileProps) => {
    const [theId, setTheId] = useState<number>(0);
    const [theEmail, setTheEmail] = useState<string>('');
    const [theUsername, setTheUsername] = useState<string>('');
    const [theCreatedAt, setTheCreatedAt] = useState<number>(0);

    const history = useHistory();

    const disableAccount = () => {
        const r = apiService('api/users/disable')
            .then(disabled => {
                history.push('/register');
            });
    }

    useEffect(() => {
        const user = apiService('api/users/profile')
            .then(user => {
                setTheId(user.id);
                setTheEmail(user.email);
                setTheUsername(user.username);
                setTheCreatedAt(user.created_at);
            });
    }, []);

    return (
        <>
            <Nav />
            <h1>{theUsername === "ATLC" || theUsername === "atlc" ? "What does ATLC stand for?" : "Welcome Back " + theUsername}!</h1>
            <h4>Basic information</h4>
            <p>Email: {theEmail}</p>
            <p>User Id Number: {theId}</p>
            <p>Member since <Moment format="MMMM DD, YYYY H:mm">{theCreatedAt}</Moment></p>

            <button onClick={disableAccount} className="btn-danger">Delete Account?</button>
        </>
    );
};

interface ProfileProps { }

export default Profile;