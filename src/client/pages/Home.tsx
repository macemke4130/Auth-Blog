import * as React from 'react';
import { useState, useEffect } from "react";
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import apiService from '../utils/api-service';
import Nav from '../components/Nav';

const Home = (props: HomeProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        apiService('/api/posts')
            .then(posts => setPosts(posts));
    }, []);

    return (
        <>
            <Nav />
            <h1>Home Page</h1>
            {posts?.map(post => (
                <div key={post.id}>
                    <h3><Link to={"/details/" + post.id}>{post.title}</Link></h3>
                    <div><small>Written by </small><span>{post.username}</span></div>
                    <div><small>Pubished </small><span><Moment format="MMMM DD, YYYY H:mm">{post.created_at}</Moment></span></div>
                    <p>{post.content}</p>
                </div>
            ))}
        </>
    );
};

interface HomeProps { }

export default Home;