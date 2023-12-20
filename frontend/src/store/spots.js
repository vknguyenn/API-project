import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'api/getSpots';
const LOAD_SPOT = 'api/getSpot';

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

        default:
            return state;
    }
}

export default spotsReducer