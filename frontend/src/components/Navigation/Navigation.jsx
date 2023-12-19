// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
   <div id='navContainer'>

     <NavLink className='navLink' to="/">Home</NavLink>
   
   {isLoaded && (
     <li>
       <ProfileButton user={sessionUser} />
     </li>
   )}

   </div>
    
   
  );
}

export default Navigation;
