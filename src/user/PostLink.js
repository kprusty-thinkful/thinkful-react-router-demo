import React from "react";
import {Link } from "react-router-dom";

export const PostLink = ({ userId, post }) => {
    return (
        <li className="list-group-item text-truncate">
            <Link to={`/users/${userId}/posts/${post.id}`} >
                {post.title}
            </Link>
        </li>
    );
};

export default PostLink;
