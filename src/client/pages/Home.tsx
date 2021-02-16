import * as React from 'react';
import { useState, useEffect } from "react";
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Home = (props: HomeProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(r => r.json())
            .then(posts => setPosts(posts));
    }, []);

    return (
        <>
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