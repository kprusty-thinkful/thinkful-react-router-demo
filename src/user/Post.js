import React from "react";
import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deletePost } from "../api";

import NoPostSelectedMessage from "./NoPostSelectedMessage";

const Post = () => {
    const [post, setPost] = useState({});
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadData() {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${postId}`,
                    { signal: abortController.signal }
                );
                const data = await response.json();
                setPost(data);
            } catch (error) {}
        }

        loadData();
        return () => abortController.abort();
    }, [postId]);


    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this post?");
        if (result) {
            await deletePost(id);
            navigate("/");
        }
    };

    if (post) {
        return (
            <article className="col-12 p-4 border">
                <h3 className="display-4 mb-4">{post.title}</h3>
                <p>{post.body}</p>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Post
                </button>
            </article>
        );
    }
    return <NoPostSelectedMessage />;
};

export default Post;
