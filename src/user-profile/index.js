import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../header";
import { saveUser } from "../reducers/user-reducer";
import { getProfile } from "../services/auth-service";
import UserNavigation from "../user-navigation";
import MyReviews from "./my-reviews";
import UserFollowers from "./user-followers";
import UserInfo from "./user-information";
import User from "../models/user";
import UserFollowing from "./user-following";
import MyWatchlist from "./my-watchlist";
import { updateUser } from "../services/user-service";

/**
 * Profile Component to show the current profile page of the user that includes account information, followers, following, movie reviews etc.
 * @returns {JSX.Element}
 */
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(user ? false : true);

    useEffect(() => {
        getProfile().then(dbUser => {
            const modelUser = User.getUserDetails(dbUser);
            dispatch(saveUser(modelUser));
            setLoading(false);
        }).catch(error => {
            //user is not logged in
            navigate("/login");
        });
    }, []);

    const onSaveProfile = async (profile) => {
        await updateUser(profile);
        dispatch(saveUser(profile));
    }

    return (
        !loading && (
            <div>
                <Header />
                <div className="container bg-white rounded-3 overflow-hidden">
                    <div className="row">
                        <div className="col ptrem mb-0">
                            <div className="backdrop-holder rounded-3" style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url('${user.headerImage}')`,
                            }}></div>
                            <div className="d-flex flex-row pull-det-up">
                                <div className="ms-4 card-imgs user-thumb">
                                    <img src={user.profilePhoto} alt="User Profile" />
                                </div>
                                <div className="ps-4">
                                    <h4 className="text-white fw-bold">{user.name}</h4>
                                    <div className="d-flex flex-row text-white">
                                        <p className="pe-4">Followers: {user.followersCount}</p>
                                        <p className="pe-4">Following: {user.followingCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ptrem mb-0">
                        <div className="row g-0">
                            <div className="col-md-3 pt-5 pb-3">
                                <div className="pt-3 pe-3">
                                    <UserNavigation />
                                </div>
                            </div>
                            <div className="col-md-9 p-3 bg-light">
                                <Routes>
                                    <Route exact path="/" element={<UserInfo user={user} onSave={onSaveProfile} />} />
                                    <Route exact path="/my-reviews" element={<MyReviews user={user} />} />
                                    <Route exact path="/my-watchlist" element={<MyWatchlist user={user} />} />
                                    <Route exact path="/followers" element={<UserFollowers user={user} />} />
                                    <Route exact path="/following" element={<UserFollowing user={user} />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;