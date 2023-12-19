import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'api/getSpots';

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
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

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newSpots = { ...state };

            action.spots.Spots.forEach(spot => {
                newSpots[spot.id] = spot;
            });

            return newSpots;
        }

        default:
            return state;
    }
}

export default spotsReducer