import * as React from 'react';
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import apiService from '../utils/api-service';
import Nav from '../components/Nav';

const EditBlog = (props: EditBlogProps) => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPost>(null);
    const [theContent, setTheContent] = useState<string>('');
    const [theTitle, setTheTitle] = useState<string>('');

    let whoIsLoggedIn: number = 0;
    let whoWroteThisPost: number | null = null;
    const history = useHistory();

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheContent(e.target.value);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheTitle(e.target.value);
    }

    const verifyUser = () => {
        if (whoIsLoggedIn != whoWroteThisPost) {
            console.log("Redirect to Public Page.");
            history.push('/details/' + id);
        } else {
            console.log("Happy Editing!");
        }
    }

    const submitEdit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const bodyObject = {
            title: theTitle,
            content: theContent
        }
        const r = await apiService('/api/posts/edit/' + id, "PUT", bodyObject);
        history.push("/details/" + id);
    }

    const destroyBlog = async () => {
        const r = await apiService('/api/posts/destroy/' + id, "PUT");
        history.push("/");
    }

    const getPost = () => {
        apiService('/api/posts/' + id)
            .then(post => {
                setTheTitle(post.title);
                setTheContent(post.content);
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
            <form>
                <input type="text" placeholder="Blog Title" onChange={handleTitleChange} value={theTitle} />
                <div><small>Written by </small><span>{post?.username}</span></div>
                <div><small>Pubished </small><span><Moment format="MMMM DD, YYYY H:mm">{post?.created_at}</Moment></span></div>
                <textarea placeholder="Blog Content" rows={10} cols={100} value={theContent} onChange={handleContentChange}></textarea>
                <button onClick={submitEdit} className="btn btn-primary">Submit Edit</button>
            </form>
            <button onClick={destroyBlog} className="btn btn-danger">Delete Blog Post?</button>
        </>
    );
};

interface EditBlogProps { }

export default EditBlog;
