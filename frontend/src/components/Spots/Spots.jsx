import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import './Spots.css'




const AllSpots = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)
    console.log(spots)

    useEffect(() => {
        dispatch(fetchAllSpots())
    }, [dispatch])

   return(
    <div>
        <div id='spotsContainer'>
            {spots.map(spot => (
            <div className='spotCard' key={spot.id}>
                <div className='spots' key={spot.id}>
                    <img className="picture" src={spot.previewImage} />
                     <div className="location">
                        <span>{spot.city}, {spot.state}</span>
                     </div>
                     <div className="rating">
                     {spot.avgRating ? (
                         <span>{`⭐${spot.avgRating}`}</span>
                         ) : (
                             <span>New</span>
                             )}
                    </div>
                    <div className="price">
                        {`$${spot.price} night`}
                    </div>

                </div>
            </div>
            ))}
        </div>
    </div>
);

}

export default AllSpots