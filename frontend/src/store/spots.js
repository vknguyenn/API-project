import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/getSpots';
const LOAD_SPOT = 'spots/getSpot';
const DELETE_SPOT = 'spots/deleteSpot'
const CREATE_SPOT = 'spots/createSpot'

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const loadSpot = (spot) => {
    return {
        type: LOAD_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const fetchAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSpots(data))
        return data
    }

}

export const fetchSpot = spotId => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSpot(data))
        return data
    }
}

export const destroySpot = spot => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}` , {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteSpot(spot.id))
        return spot.id
    }
}

export const postSpot = (spot) => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spot)
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(createSpot(data))
            return data
        }
        } catch (error){
            const errors = await error.json()
            console.log("ERRORS:", errors)
            return errors
        }
    }

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { ...state };
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            });

            return newState;
        }
        case LOAD_SPOT: {
            const newState = { ...state, [action.spot.id]: action.spot };
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState
        }
        case CREATE_SPOT: {
            return { ...state, [action.spot.id]: action.spot }
        }

        default:
            return state;
    }
}

export default spotsReducer