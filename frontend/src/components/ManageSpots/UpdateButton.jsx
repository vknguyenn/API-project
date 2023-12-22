import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { fetchSpot } from '../../store/spots';




function UpdateButtons({spotId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function update() {
        dispatch(fetchSpot(spotId));
        navigate(`/spots/${spotId}/edit`);
    }


    return (
        <div className="update-button">
            <button onClick={update}>Update</button>
        </div>
    )
}

export default UpdateButtons;