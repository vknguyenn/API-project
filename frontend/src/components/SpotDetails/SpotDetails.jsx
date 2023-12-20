import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import './SpotDetails.css'



const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId])
    console.log("SPOT: ", spot)


    useEffect(() => {
        dispatch(fetchSpot(spotId));
    }, [dispatch, spotId])

    if (!spot || !spot.Owner) {
        return <div>Loading...</div>;
    }
    console.log("avgRating:", spot.avgRating)

    return (
        <div className="details-container">
            <h1>{spot.name}</h1>
            <div className="location">
              <h2>{spot.city}, {spot.state}, {spot.country}</h2> 
            </div>
            <div id='image-container'>
            <div className="main-image">
                <img className="main-pic" src={spot.SpotImages[0].url} alt='main-pic' />
            </div>
            <div className="other-images">
                <img className="img2" src={spot.SpotImages} alt='img2' />
                <img className="img3" src={spot.SpotImages} alt='img3' />
                <img className="img4" src={spot.SpotImages} alt='img4' />
                <img className="img5" src={spot.SpotImages} alt='img5' />
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
        </div>
    )

}

export default SpotDetails;