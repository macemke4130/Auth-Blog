import * as React from 'react';
import { useState, useEffect } from "react";
import Nav from '../components/Nav';
import apiService from '../utils/api-service';
import { useHistory } from 'react-router-dom';

const EditProfile = (props: EditProfileProps) => {
    const [theEmail, setTheEmail] = useState<string>('');
    const [theUsername, setTheUsername] = useState<string>('');

    const history = useHistory();

    const disableAccount = () => {
        const r = apiService('api/users/disable')
            .then(disabled => {
                history.push('/register');
            });
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheEmail(e.target.value);
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheUsername(e.target.value);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const bodyObject = {
            email: theEmail,
            username: theUsername
        }
        const r = apiService('api/users/editprofile', "PUT", bodyObject)
        .then(r => {
            history.push('/profile');
        });
    }

    useEffect(() => {
        const user = apiService('api/users/profile')
            .then(user => {
                if(localStorage.getItem('isAuth') === "false") {
                    // Token has expired or is not authorized --
                    history.push('/login');
                }
                setTheEmail(user.email);
                setTheUsername(user.username);
            });
    }, []);

    return (
        <>
            <Nav />

            <form>
                <input type="text" placeholder="Username" value={theUsername} onChange={handleUsernameChange} />
                <input type="text" placeholder="Email" value={theEmail} onChange={handleEmailChange} />
                <button onClick={handleSubmit}>Submit Changes</button>
            </form>

            <button onClick={disableAccount} className="btn-danger">Delete Account?</button>
        </>
    );
};

interface EditProfileProps { }

export default EditProfile;