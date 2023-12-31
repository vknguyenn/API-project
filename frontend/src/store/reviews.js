import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'api/getReviews'
const CLEAR_REVIEWS = 'api/clearReviews';
const POST_REVIEW = 'api/postReview'
const DELETE_REVIEW = 'api/deleteReview'

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS,
    };
};

export const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const fetchAllReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    
    if (res.ok) {
        const data = await res.json();
        console.log('Reviews: ', data)
        dispatch(loadReviews(data));
        return data
    }
}

export const createReview = (review, spotId, sessionUser) => async dispatch => {
    console.log("Posting review:", review, "to spot:", spotId);
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const newReview = await res.json();
        dispatch(postReview({...newReview, User: sessionUser}))
        return newReview
    }

}

export const removeReview = review => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteReview(review.id))
        return review.id
    }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const newState = { ...state };
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        }
        case CLEAR_REVIEWS: {
            return {}; 
        }
        case POST_REVIEW: {
            return { 
                ...state,
                [action.review.id]: action.review 
            };
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default: 
            return state;
    }
}

export default reviewsReducer