import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'api/getReviews'
const CLEAR_REVIEWS = 'api/clearReviews';

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

export const fetchAllReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    
    if (res.ok) {
        const data = await res.json();
        console.log('Reviews: ', data)
        dispatch(loadReviews(data));
        return data
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
        default: 
            return state;
    }
}

export default reviewsReducer