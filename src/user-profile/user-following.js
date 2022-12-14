import { useEffect, useState } from "react";
import { findAllFollowing } from "../services/follow-service";
import FollowList from "../follow-list";
import { getProfile } from "../services/auth-service";
import User from "../models/user";
import { useDispatch } from "react-redux";
import { saveUser } from "../reducers/user-reducer";

/**
 * Responsible for handling the following list of a user.
 */
const UserFollowing = ({ user }) => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Find all the users that the passed in user is following.
   */
  const findFollowings = () => {
    if (user.id) {
      findAllFollowing(user.id).then((res) => {
        setFollowing(res);
        setLoading(false);
      });
      getProfile().then((dbUser) => {
        const modelUser = User.getUserDetails(dbUser);
        dispatch(saveUser(modelUser));
      });
    }
  };

  useEffect(() => {
    findFollowings();
  }, [user]);

  return (
    !loading && (
      <FollowList
        followList={following}
        cancelRequired={true}
        onCancel={findFollowings}
      />
    )
  );
};

export default UserFollowing;
