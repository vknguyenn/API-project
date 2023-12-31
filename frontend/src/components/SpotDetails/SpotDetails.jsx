import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import { fetchAllReviews } from "../../store/reviews";
import SpotReviews from "../Reviews/Reviews";
import OpenModalButton from '../OpenModalButton'
import ReviewForm from "../Reviews/PostReview";
import './SpotDetails.css'




const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId])
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    
    const [hasReviewed, setHasReviewed] = useState(false);
    
    // console.log("SPOT: ", spot)
    console.log("REVIEW IN SPOT DETAILS: ", reviews)

    useEffect(() => {
        dispatch(fetchSpot(spotId));
        dispatch(fetchAllReviews(spotId))
        
    
        
    }, [dispatch, spotId])

    useEffect(() => {
    //         reviews.map((review) => {
    //         if (sessionUser.id === review.User.id) {
    //             setHasReviewed(true)
    //         }
    // })
    if (reviews && sessionUser) {
        const searchIfReviewed = Object.values(reviews).some(review => review.userId === sessionUser.id);
        console.log(searchIfReviewed)
        setHasReviewed(searchIfReviewed)
    }
        console.log("Reviews: ", reviews)
        
    }, [reviews, sessionUser])

   
  

    if (!spot || !spot.Owner) {
        return <div>Loading...</div>;
    }

    if (!spot.SpotImages) return null;

    console.log("spotImages: ", spot.SpotImages)

    return (
        <div className="details-container">
            <h1>{spot.name}</h1>
            <div className="location">
              <h3>{spot.city}, {spot.state}, {spot.country}</h3> 
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
            <div className="spot-description">{spot.description}</div>
                </div>
            <div className="reserve-container">
                <div className="price-rating-numReview">
                    <h2>${spot.price}</h2>
                    <span>night</span> 
                    <span>{spot.numReviews === 0 ? '⭐ New' : `⭐${spot.avgRating.toFixed(1)}`}</span>
                    <span>{spot.numReviews === 1 ? ' · 1 Review' : (spot.numReviews > 1 ? ` · ${spot.numReviews} Reviews` : '')}</span>
                </div>
                <button className="reserve" onClick={() => {
                    throw alert('Feature coming soon')
                }}>Reserve</button>
                </div>
                </div>
                <div className="spot-reviews">
                <div className="review-stuff">
                <span className="review-info">{spot.numReviews === 0 ? '⭐ New' : `⭐${spot.avgRating.toFixed(1)}`} {spot.numReviews === 1 ? ' · 1 Review' : (spot.numReviews > 1 ? ` · ${spot.numReviews} Reviews` : '')}</span>
                {/* <span className="review-info">{spot.numReviews === 1 ? ' · 1 Review' : (spot.numReviews > 1 ? ` · ${spot.numReviews} Reviews` : '')}</span> */}
                {
                    sessionUser && 
                    sessionUser?.id !== spot.Owner.id && !hasReviewed &&
                    <OpenModalButton className="post-review-button" buttonText="Post Your Review" modalComponent={<ReviewForm spot={spot}/>} />
                }
                {sessionUser?.id !== spot.Owner.id && spot.numReviews === 0 ?  "Be the first to post a review!" : null}
                 
                </div>
                <SpotReviews />
                </div>
        </div>
    )

}

export default SpotDetails;