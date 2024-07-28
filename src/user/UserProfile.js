import React, {useState, useEffect } from "react";
import {useParams} from "react-router-dom";

export const UserProfile = () => {
    const [person, setPerson] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadData() {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`,
                    { signal: abortController.signal }
                );
                const data = await response.json();
                setPerson(data);
            } catch (error) {}
        }

        loadData();
        return () => abortController.abort();
    }, [userId]);

    return (
        <div
            className="tab-pane active pt-2"
            role="tabpanel"
            aria-labelledby="profle-tab"
        >
            <div className="row">
                <div className="col-sm-3 col-md-2 col-5">
                    <label>User Name</label>
                </div>
                <div className="col-md-8 col-6">{person.username}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3 col-md-2 col-5">
                    <label>EMail</label>
                </div>
                <div className="col-md-8 col-6">{person.email}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3 col-md-2 col-5">
                    <label>Phone</label>
                </div>
                <div className="col-md-8 col-6">{person.phone}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3 col-md-2 col-5">
                    <label>Company</label>
                </div>
                <div className="col-md-8 col-6">{(person.company || {}).name}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3 col-md-2 col-5">
                    <label>Website</label>
                </div>
                <div className="col-md-8 col-6">{person.website}</div>
            </div>
            <hr />
        </div>
    );
};

export default UserProfile;
