import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { Link } from 'react-router-dom';
import './Spots.css'




const AllSpots = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)
    // console.log(spots)

    useEffect(() => {
        dispatch(fetchAllSpots())
        console.log("I am here")
    }, [dispatch])

   return(
    <div>
        <div id='spotsContainer'>
            {spots.map(spot => (
            <div className="tooltip" key={spot.id}>
            <Link to={`/spots/${spot.id}`} className='spotCard' key={spot.id}>

                <div className='spots' key={spot.id}>
                
                    <img className="picture" src={spot.previewImage} />
                     <div className="location">
                        <span>{spot.city}, {spot.state}</span>
                     </div>
                     <span className="tooltip-name">{spot.name}</span>
                     <div className="rating">
                     {spot.avgRating > 0 ? 
                     (<span>⭐{parseFloat(spot.avgRating).toFixed(1)}</span>) : 
                     (<span>⭐New</span>)}
                    </div>
                    <div className="price">
                        {`$${spot.price} night`}
                    </div>
                         

                </div>
            </Link>
            </div>
            ))}
        </div>
    </div>
);

}

export default AllSpots