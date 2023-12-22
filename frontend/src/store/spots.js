import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/getSpots';
const LOAD_SPOT = 'spots/getSpot';
const DELETE_SPOT = 'spots/deleteSpot'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'

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


const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
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

export const postSpot = (spot, imgArr) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const spot = await res.json()
        console.log('IN SPOT RESPONSE', imgArr, spot)

        if (spot) {
            for (let img of imgArr) {
            if (img) {
                const newImg = await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({spotId: spot.id, url: img.url, preview: true})
                    
                })
                console.log("IMAGE: ", newImg)
            }
            }
                dispatch(createSpot(spot))
            
            return spot
        }

    }
    }

export const editSpot = (spotInfo, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(spotInfo)
    })
    if(res.ok) {
        const data = await res.json();
            console.log("DATA: ", data)
            dispatch(updateSpot(data))
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
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state, [action.spot.id]: action.spot };
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = { ...state, [action.spot.id]: action.spot };
            return newState;
        }

        default:
            return state;
    }
}

export default spotsReducer