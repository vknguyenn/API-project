import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { destroySpot } from "../../store/spots";

const DeleteSpot = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onClick = e => {
        e.preventDefault();
        return dispatch(destroySpot(spot))
        .then(closeModal)
    }
    return (
        <div id='delete-container'>
            <h1>Confirm Delete</h1>
            <div className="delete-modal">
                <span>Are you sure you want to remove this spot from the listings?</span>
                <button className='managing-buttons' onClick={onClick}>Yes (Delete Spot)</button>
                <button className="managing-buttons" onClick={closeModal}>No (Keep Spot)</button>
            </div>

        </div>
        
    )
}
export default DeleteSpot;