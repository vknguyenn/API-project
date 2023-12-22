import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import SpotReviews from "../Reviews/Reviews";
import './SpotDetails.css'




const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId])
    // console.log("SPOT: ", spot)


    useEffect(() => {
        dispatch(fetchSpot(spotId));
    }, [dispatch, spotId])

    if (!spot || !spot.Owner) {
        return <div>Loading...</div>;
    }

    if (!spot.SpotImages) return null;

    console.log("spotImages: ", spot.SpotImages)

    return (
        <div className="details-container">
            <h1>{spot.name}</h1>
            <div className="location">
              <h2>{spot.city}, {spot.state}, {spot.country}</h2> 
            </div>
            <div id='image-container'>
            <div className="main-image">
                <img className="main-pic" src={spot.SpotImages[0]?.url} alt='main-pic' />
            </div>
             
            <div className="other-images">
                <div className="other-img"><img src={spot.SpotImages?.[1]?.url} /> </div>
                <div className="other-img"><img src={spot.SpotImages?.[2]?.url} /></div>
                <div className="other-img"><img src={spot.SpotImages?.[3]?.url} /></div>
                <div className="other-img"><img src={spot.SpotImages?.[4]?.url} /></div>
            </div>
            </div>
            <div className="middle-container">
            <div className="spot-info">
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2> 
            <div>{spot.description}</div>
                </div>
            <div className="reserve-container">
                <div className="price-per-night">
                    <h2>${spot.price}</h2>
                </div>
                <div className="spot-rating">
                    <span>⭐{spot.avgRating}</span>
                    <span> · </span>
                    <span>{spot.numReviews} reviews</span>
                </div>
                <button className="reserve" onClick={() => {
                    throw alert('Feature coming soon')
                }}>Reserve</button>
                </div>
                </div>
                <div className="spot-reviews">
                <span>⭐{spot.avgRating}</span>
                <span> · </span>
                <span>{spot.numReviews} reviews</span>
                <SpotReviews />
                </div>
        </div>
    )

}

export default SpotDetails;