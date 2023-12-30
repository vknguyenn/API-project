import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { fetchSpot } from '../../store/spots';
import './ManageSpots.css'




function UpdateButtons({spotId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function update() {
        dispatch(fetchSpot(spotId));
        navigate(`/spots/${spotId}/edit`);
    }


    return (
        <div>
            <button className="update-button" onClick={update}>Update</button>
        </div>
    )
}

export default UpdateButtons;