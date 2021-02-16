import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import apiService from '../utils/api-service';
import Nav from '../components/Nav';

const Details = (props: DetailsProps) => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPost>(null);

    useEffect(() => {
        apiService('/api/posts/' + id)
            .then(post => setPost(post));
    }, []);

    return (
        <>
            <Nav />
            <h1>Details Page for {id}</h1>
            <div>
                <h3>{post?.title}</h3>
                <div><small>Written by </small><span>{post?.username}</span></div>
                <div><small>Pubished </small><span><Moment format="MMMM DD, YYYY H:mm">{post?.created_at}</Moment></span></div>
                <p>{post?.content}</p>
            </div>
        </>
    );
};

interface DetailsProps { }

export default Details;
