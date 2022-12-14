import { useNavigate } from "react-router";
import { deleteFollowing } from "../services/follow-service";
import { useSelector } from "react-redux";

/**
 * Responsible for displaying followers of  user.
 * This is the single item of the list of users.
 */
const FollowListItem = ({ followUser, cancelRequired, onCancel }) => {
  const navigate = useNavigate();
  const profileUser = useSelector((state) => state.user);
  const onUserItemClick = () => {
    navigate(`/view-profile/${followUser._id}`);
  };

  /**
   * Responsible for deleting a user from the list.
   */
  const onCancelItemClick = async (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    await deleteFollowing(profileUser.id, followUser._id);
    if (onCancel && typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <div className="col-4 mb-3 me-3">
      <div
        className="d-flex flex-row align-items-center rounded-3 bg-white p-2 pointer"
        onClick={onUserItemClick}
      >
        <img
          src={followUser.profilePhoto}
          width="50"
          height="50"
          alt="username"
          className="rounded-circle"
        />
        <div className="flex-fill ps-3">
          <span className="text-primary">{followUser.name}</span>
        </div>
        {cancelRequired && (
          <span className="float-end" onClick={onCancelItemClick}>
            <i className="fa-solid fa-xmark text-muted pointer" />
          </span>
        )}
      </div>
    </div>
  );
};

export default FollowListItem;
