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

    if (posts.length === 0) {
        return (
            <>
                <Nav />
                <h3>No blogs posted yet!</h3>
            </>
        );
    } else {
        return (
            <>
                <Nav />
                {posts?.map(post => (
                    <div key={post.id}>
                        <h3><Link to={"/details/" + post.id}>{post.title}</Link></h3>
                        <div><small>Written by </small><span>{post.username}</span></div>
                        <div><small>Pubished </small><span><Moment format="MMMM DD, YYYY H:mm">{post.created_at}</Moment></span></div>
                        <p>{post.content}</p>
                        <hr></hr>
                    </div>
                ))}
            </>
        );
    }

};

interface HomeProps { }

export default Home;