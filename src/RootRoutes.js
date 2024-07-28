import React from 'react'
import CardList from "./home/CardList";
import User from "./user/User";
import { Routes, Route } from 'react-router-dom';
import NotFound from "./common/NotFound";
import UserProfile from "./user/UserProfile";
import PostList from "./user/PostList";
import NoPostSelectedMessage from "./user/NoPostSelectedMessage";
import Post from "./user/Post";

function RootRoutes() {

    return (
        <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="users/:userId" element={<User />}>
                <Route index element={<UserProfile />}/>
                <Route path="posts" element={<PostList />} >
                    <Route index element={<NoPostSelectedMessage />} />
                    <Route path=":postId" element={<Post />} />
                </Route>
            </Route>
            <Route path="/*" element={<NotFound />}/>
        </Routes>
    )
}

export default RootRoutes
