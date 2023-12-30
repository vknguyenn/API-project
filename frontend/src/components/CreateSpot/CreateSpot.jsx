import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSpot } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import './CreateSpot.css'


const CreateSpot = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [img5, setImg5] = useState('')
    const [errors, setErrors] = useState({})
    

    const addressInput = e => setAddress(e.target.value);
    const cityInput = e => setCity(e.target.value);
    const stateInput = e => setState(e.target.value);
    const countryInput = e => setCountry(e.target.value);
    const descriptionInput = e => setDescription(e.target.value);
    const nameInput = e => setName(e.target.value);
    const priceInput = e => setPrice(e.target.value);
    const previewImageInput = e => {
        setPreviewImage(e.target.value);
        console.log("PREVIEW IMAGE: ", e.target.value)
    }
    const img2Input = e => setImg2(e.target.value);
    const img3Input = e => setImg3(e.target.value);
    const img4Input = e => setImg4(e.target.value);
    const img5Input = e => setImg5(e.target.value);


    
    function validationInputs() {
        let errs = {};
    
        if(!address) errs.address = "Address is required"
        if(!city) errs.city = "City is required"
        if(!state) errs.state = "State is required"
        if(!country) errs.country = "Country is required"
        if(description.length < 30) errs.description = "Description needs a minimum of 30 characters"
        if(!name) errs.name = "Name is required"
        if(!price) errs.price = "Price is required"
        if(!previewImage) errs.previewImage = "Preview image is required"


        setErrors(errs)
        // console.log("Validation errors:", errs);
        return errs
    }

    const submitForm = async (e) => {  
        e.preventDefault();

    
        const createdSpot = {
            ownerId: sessionUser.id,
            address,
            city,
            state, 
            country, 
            name, 
            description,
            price
        };

        const createdImages = [{ url: previewImage, preview: true }];

        if (img2) createdImages.push({ url: img2, preview: false });
        if (img3) createdImages.push({ url: img3, preview: false });
        if (img4) createdImages.push({ url: img4, preview: false });
        if (img5) createdImages.push({ url: img5, preview: false });
    
        const formErrors = validationInputs();
        if (Object.keys(formErrors).length === 0) {
            console.log("Image Array:", createdImages);
            const newSpot = await dispatch(postSpot(createdSpot, createdImages));

            if (newSpot) {
                
                navigate(`/spots/${newSpot.id}`);
            } else if (newSpot.errors) {
                setErrors(newSpot.errors);
            }
            
        }
        
        // console.log("Image Array after dispatch:", createdImages);
        // console.log("NEW SPOT: ", newSpot)
    }

    return (
        <div id='create-page'>
            <div id='form-container'>
            <h1>Create a New Spot</h1>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get to your exact address once they booked a reservation.</p>
            <div id='create-form'>
            <form onSubmit={submitForm}>
                <div className="location-container">
                <label className="inputs">
                    Country {errors.country && <p style={{color:"red"}} className="err">{errors.country}</p>}
                </label>
                    <input className="create-input" placeholder="Country" value={country} onChange={countryInput} />
                <label className="inputs">
                    Street Address {errors.address && <p style={{color:"red"}} className="err">{errors.address}</p>}
                </label>
                    <input className="create-input" placeholder="Address" value={address} onChange={addressInput} />
                
                <div className="city-state">
                    <div className="city-container">
                <label className="inputs">
                    City {errors.city && <p style={{color:"red"}} className="err">{errors.city}</p>}
                </label>
                    <input className="create-input-city" placeholder="City" value={city} onChange={cityInput} />
                {/* <span>, </span> */}
                
                    </div>
                    <div className="state-container">

                <label className="inputs">
                    State {errors.state && <p style={{color:"red"}} className="err">{errors.state}</p>}
                </label>
                    <input className="create-input" placeholder="State" value={state} onChange={stateInput} />
                
                    </div>
                </div>
                </div>
                <div className="description-container">
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea className="description-input" placeholder="Please write at least 30 characters" type='text' value={description} onChange={descriptionInput} />
                    {errors.description && <p style={{color:"red"}} className="err">{errors.description}</p>}              
                </div>
                <div className="title-container">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <input className="create-input-title" placeholder="Name of your spot" value={name} onChange={nameInput} />
                    {errors.name && <p style={{color:"red"}} className="err">{errors.name}</p>}
                </div>
                <div className="price-container">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing standout and rank higher in search results</p>
                    <span> $ </span>
                    <input className="create-input" placeholder="Price per night (USD)" value={price} onChange={priceInput} />
                    {errors.price && <p style={{color:"red"}} className="err">{errors.price}</p>}
                </div>
                <div id='images-container'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    <input className="create-input-img" placeholder="Preview Image URL" id='preview-img' value={previewImage} onChange={previewImageInput} type='URL' />
                    {errors.previewImage && <p style={{color:"red"}} className="err">{errors.previewImage}</p>}
                    <input className="create-input-img" placeholder="Image URL" value={img2} onChange={img2Input} type="URL"/>
                    <input className="create-input-img" placeholder="Image URL" value={img3} onChange={img3Input} type="URL"/>
                    <input className="create-input-img" placeholder="Image URL" value={img4} onChange={img4Input} type="URL"/>
                    <input className="create-input-img" placeholder="Image URL" value={img5} onChange={img5Input} type="URL"/>
                </div>
                <div className="create-button-container">
                    <button className="create-button"type="submit">Create Spot</button>
                </div>
            </form>
            </div>
            </div>
        </div>
    )


}

export default CreateSpot