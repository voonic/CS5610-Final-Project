import React from "react";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Header from "../header";

/**
 * User Component to show the current profile page of the user.
 * @returns {JSX.Element}
 */
const UserInfo = () => {

    const {user} = useSelector(state => state.user)
    return (
        <div>
        <Header />
            <div className="container bg-white rounded-3 overflow-hidden">
        <div className={"row"}>
            <div className={"col-2 mt-3"}>

                <img src={`/images/${user.profilePicture}`} className="img-fluid rounded-circle ms-3 me-3" />
            </div>



            <div className="d-flex float-end col-10">

                <div>
                    <p className="mt-3 ps-2 fw-bold">{user.firstName} {user.lastName}</p>
                    <p className="small mt-0 ps-2 text-muted">{user.userName}</p>
                    <p className="text-muted ps-2">
                        <i className="text-success fa fa-calendar " /> Joined: {user.dateJoined}</p>
                    <p className="text-muted ps-2">
                        <i className=" text-success fa fa-cake-candles" /> Born: {user.dateOfBirth}
                    </p>
                    <Link to="/edit-profile" type="button" className="ps-2 btn btn-sm btn-success text-light fw-bold rounded-pill">Edit Profile</Link>
                </div>
            </div>

        {/*removed the ratings from here.*/}

        </div>

        </div>
            </div>

    );
}

export default UserInfo;