import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeReview, fetchAllReviews } from "../../store/reviews";
import './DeleteReview.css'

const DeleteReview = ({review, spotId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onClick = e => {
        e.preventDefault();
        try {
            dispatch(removeReview(review));
            dispatch(fetchAllReviews(spotId)); // Re-fetch reviews
            closeModal();
        } catch (error) {
            console.error("Failed to delete review:", error);
            // You might want to display an error message to the user here
        }
    }
    return (
        <div id='delete-review-container'>
            <h1>Confirm Delete</h1>
            <div className="delete-review-modal">
                <span>Are you sure you want to remove this review?</span>
                <button id='delete-review-button'className='managing-review-buttons' onClick={onClick}>Yes (Delete Review)</button>
                <button id='no-delete-review'className="managing-review-buttons" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReview;