import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import './ManageSpots.css'

const ManageSpots = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)
    const sessionUser = useSelector(state => state.session.user)
   
    let currentSpots = spots.filter(spot => spot.ownerId === sessionUser.id);

    console.log(currentSpots)
    useEffect(() => {
        dispatch(fetchAllSpots())
    }, [dispatch])

    return(
        <div id='page-container'>
            <h1>Manage Your Spots</h1>
            <button id='create-spot-button'>Create a New Spot</button>
            <div className="user-spots">
                <div className="spotsContainer">
                    {currentSpots.map(spot => (
                        <div key={spot.id} className="spotItem">
                            <Link to={`/spots/${spot.id}`} className="spot-card">
                                <div className="spots">
                                    <img className="picture" src={spot.previewImage} alt="Spot" />
                                    <div className="location">
                                        <span>{spot.city}, {spot.state}</span>
                                    </div>
                                    <div className="rating-card">
                                        {spot.avgRating > 0 ? (
                                            <span>{`⭐${spot.avgRating}`}</span>
                                        ) : (
                                            <span>⭐New</span>
                                        )}
                                    </div>
                                    <div className="price">
                                        {`$${spot.price} night`}
                                    </div>
                                </div>
                            </Link>
                            <div className="manage-buttons">
                            <button>Update</button>
                            <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteSpot spot={spot}/>}
                            />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageSpots