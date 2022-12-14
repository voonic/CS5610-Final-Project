import { useEffect, useState } from "react";
import { findAllReviews } from "../services/user-review-services";
import ReviewList from "../reviews/reviews-list";
import Review from "../models/review";

/**
 * Responsible for the user reviews that are to be moderated or checked by the admin.
 */
const UserReviewModerationList = () => {
  const [allReviews, setAllReviews] = useState([]);

  const refresh = () => {
    findAllReviews().then((reviews) => {
      const list = Review.getListFromJsonArray(reviews);
      setAllReviews(list);
    });
  };

  const onDelete = () => {
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <ReviewList reviewList={allReviews} onDelete={onDelete} isAdmin={true} />
    </div>
  );
};

export default UserReviewModerationList;
