import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import apiService from '../utils/api-service';
import Nav from '../components/Nav';
import { verify } from 'jsonwebtoken';

const EditBlog = (props: EditBlogProps) => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPost>(null);

    let whoIsLoggedIn: number = 0;
    let whoWroteThisPost: number | null = null;
    const history = useHistory();

    const verifyUser = () => {
        if (whoIsLoggedIn != whoWroteThisPost) {
            console.log("Redirect to Public Page.");
            history.push('/details/' + id);
        } else {
            console.log("Happy Editing!");
        }
    }

    const getPost = () => {
        apiService('/api/posts/' + id)
            .then(post => {
                setPost(post)
                whoWroteThisPost = post.user_id;
                verifyUser();
            });
    }

    useEffect(() => {
        apiService('/api/users/who')
            .then(who => {
                whoIsLoggedIn = who;
                getPost();
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
            </div>
        </>
    );
};

interface EditBlogProps { }

export default EditBlog;
