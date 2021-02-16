import * as React from 'react';
import Nav from '../components/Nav';

const Profile = (props: ProfileProps) => {
    
    return (
        <>  
            <Nav />
            <h1>Profile Page</h1>
        </>
    );
};

interface ProfileProps { }

export default Profile;