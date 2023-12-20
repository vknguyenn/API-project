import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import { clearReviews } from "../../store/reviews";
import './Reviews.css'

export default function SpotReviews() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
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
        const date = new Date(string);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    return (
        <div className="reviews-container">
            {reviews.map(review => (
                <div className="review" key={review.id}>
                    <h3 className="user-review">{review.User.firstName}</h3>
                    <div className="review-date">{createDate(review.createdAt)}</div>
                    <div className="review-message">{review.review}</div>
                </div>
            ))}

        </div>
    )
}