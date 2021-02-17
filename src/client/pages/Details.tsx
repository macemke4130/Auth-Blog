import * as React from 'react';
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import apiService from '../utils/api-service';
import Nav from '../components/Nav';

const Details = (props: DetailsProps) => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPost>(null);
    const [whoIsLoggedIn, setWhoIsLoggedIn] = useState<number | null>(null);
    const [whoWroteThisPost, setWhoWroteThisPost] = useState<number>(0);

    useEffect(() => {
        if (localStorage.getItem('isAuth') === 'true') {
            apiService('/api/users/who')
                .then(who => {
                    setWhoIsLoggedIn(who);
                });
        }

        apiService('/api/posts/' + id)
            .then(post => {
                setPost(post)
                setWhoWroteThisPost(post.user_id);
            });
    }, []);

    return (
        <>
            <Nav />
            <div>
                <h3>{post?.title}</h3>
                <div><small>Written by </small><span>{post?.username}</span></div>
                <div><small>Pubished </small><span><Moment format="MMMM DD, YYYY H:mm">{post?.created_at}</Moment></span></div>
                <p>{post?.content}</p>
                {whoIsLoggedIn === whoWroteThisPost ? <Link to={"/editblog/" + id}><button>Edit Post?</button></Link> : ""}
            </div>
        </>
    );
};

interface DetailsProps { }

export default Details;
