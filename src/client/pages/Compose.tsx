import * as React from 'react';
import { useState, useEffect } from "react";
import { IPost } from '../utils/types';
import Moment from 'react-moment';
import { Link, useHistory } from 'react-router-dom';
import apiService from '../utils/api-service';
import Nav from '../components/Nav';

const Compose = (props: ComposeProps) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [theTitle, setTheTitle] = useState<string>('');
    const [theContent, setTheContent] = useState<string>('');
    const [theTheUsername, setTheUsername] = useState<string>('');

    const history = useHistory();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheTitle(e.target.value);
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheContent(e.target.value);
    }

    const validateBlog = () => {
        sendBlog();
    }

    const sendBlog = async () => {
        const bodyObject = {
            title: theTitle,
            content: theContent
        }
        const r = await apiService('/api/posts', "POST", bodyObject);
        history.push("/details/" + r.newPostId);
    }

    const getUser = async () => {
        const r = await apiService('/api/users/name');
        setTheUsername(r[0].username);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Nav />
            <h1>Compose Page</h1>
            <p>Logged in as {theTheUsername}</p>
            <div className="d-flex flex-column p-2">
                <input type="text" placeholder="Blog Title" onChange={handleTitleChange} />
                <textarea placeholder="Blog Content" rows={10} cols={100} onChange={handleContentChange}></textarea>
                <button onClick={validateBlog}>Submit New Blog!</button>
            </div>
        </>
    );
};

interface ComposeProps { }

export default Compose;