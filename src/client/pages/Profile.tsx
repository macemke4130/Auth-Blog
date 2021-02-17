import * as React from 'react';
import { useState, useEffect } from "react";
import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import Moment from 'react-moment';
import { useHistory, Link } from 'react-router-dom';

const Profile = (props: ProfileProps) => {
    const [theId, setTheId] = useState<number>(0);
    const [theEmail, setTheEmail] = useState<string>('');
    const [theUsername, setTheUsername] = useState<string>('');
    const [theCreatedAt, setTheCreatedAt] = useState<number>(0);

    const history = useHistory();

    useEffect(() => {
        const user = apiService('api/users/profile')
            .then(user => {
                if(localStorage.getItem('isAuth') === "false") {
                    // Token has expired or is not authorized --
                    history.push('/login');
                }
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

            <Link to="/editprofile"><button className="btn-info">Edit Profile</button></Link>
        </>
    );
};

interface ProfileProps { }

export default Profile;