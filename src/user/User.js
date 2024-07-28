import React, { useEffect, useState } from "react";
import {
    useParams,
    Outlet,
    Link,
    useNavigate,
    NavLink,
} from "react-router-dom";
import { fetchUserWithPosts } from "../api";
import PostsNav from "./PostsNav";
import ErrorMessage from "../common/ErrorMessage";

export const User = () => {
    const [user, setUser] = useState({ posts: [] });
    const [error, setError] = useState(undefined);
    const { userId } = useParams();
    useEffect(() => {
        const abortController = new AbortController();
        fetchUserWithPosts(userId, abortController.signal)
            .then(setUser)
            .catch(setError);

        return () => abortController.abort();
    }, [userId]);

    // TODO: Change the link below to go back to the home page.
    if (error) {
        return (
            <ErrorMessage error={error}>
                <p>
                    <Link to="/">Return Home</Link>
                </p>
            </ErrorMessage>
        );
    }
    return (
        <section className="container">
            <PostsNav />
            {user && (
                <div className="border p-4 h-100 d-flex flex-column">
                    <h2 className="mb-3">{user.name}</h2>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link to={`/users/${userId}`} className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/users/${userId}/posts`} className="nav-link">
                                Posts
                            </Link>
                        </li>
                    </ul>

                    {user.id ? (
                        <div className="p-4 border border-top-0">
                            <Outlet />
                        </div>
                    ) : (
                        <div className="p-4 border border-top-0">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default User;