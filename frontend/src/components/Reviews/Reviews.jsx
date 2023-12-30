import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import { clearReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview/DeleteReview";
import './Reviews.css'

export default function SpotReviews() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const reviewsObj = useSelector(state => state.reviews);
    const reviews = Object.values(reviewsObj);

    // console.log("reviews: ", reviews)
    
    useEffect(() => {
            dispatch(fetchAllReviews(spotId))
            return () => {
                dispatch(clearReviews());
            };
        }, [dispatch, spotId])

    if (!reviews) return <p>No reviews available.</p>;

    const createDate = (string) => {
        const dates = new Date(string);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[dates.getMonth()]} ${dates.getFullYear()}`;
    }

    const reviewOrder = (f, l) => {
        return l.id - f.id
    }

    return (
        <div className="reviews-container">
            {reviews.sort(reviewOrder).map(review => (
                <div className="review" key={review.id}>
                    <h3 className="user-review">{review.User?.firstName}</h3>
                    <div className="review-dates">{createDate(review.createdAt)}</div>
                    <div className="review-message">{review.review}</div>
                    {
                        sessionUser?.id == review.userId ?
                        <OpenModalButton buttonText="Delete" modalComponent={<DeleteReview review={review} spotId={spotId} />} /> : null                    }
                </div>
            ))}

        </div>
    )
}