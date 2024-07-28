import React, {useState, useEffect} from "react";

import PostLink from "./PostLink";
import {Outlet, useParams} from "react-router-dom";

export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadData() {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
                    { signal: abortController.signal }
                );
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.log(error);
                    throw error;
                }
            }
        }

        loadData();
        return () => {
            abortController.abort();
        };
    }, [userId]);

    const postLinks = Array.isArray(posts) && posts.map((post) => (
        <PostLink key={post.id} userId={post.userId} post={post} />
    ));

    return (
        <div className="row pt-2">
            <div className="col-3">
                <ul className="list-group">{postLinks}</ul>
            </div>
            <div className="col-9">
                <Outlet />
            </div>
        </div>
    );
};
export default PostList;
