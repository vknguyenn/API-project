import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createReview } from "../../store/reviews";
import { useModal} from "../../context/Modal"
import './PostReview.css'

const ReviewForm = ({spot}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [errMessage, setErrMessage] = useState({})
    

    const submit = async (e) => {
        e.preventDefault();
    
        const postedReview = {
            review,
            stars
        }
    
        try {
            await dispatch(createReview(postedReview, spot.id, sessionUser));
            closeModal();
        } catch (response) {
        
                const data = await response.json(); // Convert response to JSON
                console.log("Received errors:", data.errors); // Log errors
        
                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data?.message) {
                    setErrMessage(data)
                }
        }
    };




    return (
        <div id="review-modal">
            <h1>How was your stay?</h1>
            <div className="review-container">
                <form onSubmit={submit}>
                <div className="error-messages">
                    {errMessage.message && <p style={{color:"red"}} className="err-message">{errMessage.message}</p>}
                    {Object.values(errors).map((error, index) => (
                        <p key={index} style={{color:"red"}} className="error-message">{error}</p>
                    ))}
                </div>
                    <div id='review-text-container'>
                    <textarea className="review-text" placeholder="Leave your review here..." type='text' value={review} onChange={e => setReview(e.target.value)} />
                    </div>
                    <ul className="ratings">
                    <div className="star-rate">
                    <li onClick={() => setStars(1)}><i className={`fa fa-star ${stars >= 1 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(2)}><i className={`fa fa-star ${stars >= 2 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(3)}><i className={`fa fa-star ${stars >= 3 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(4)}><i className={`fa fa-star ${stars >= 4 ? "filled" : "empty"}`}></i></li>
                    <li onClick={() => setStars(5)}><i className={`fa fa-star ${stars >= 5 ? "filled" : "empty"}`}></i></li>
                    <li id='stars-list'>Stars</li>
                    </div>
                </ul>
                    <button id='submit-review-button' disabled={review.length < 10 || stars === ''}>Submit your review</button>
                </form>
            </div>
        </div>
    )

}

export default ReviewForm
