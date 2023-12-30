// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { CreateSpotButton } from './CreateSpotButton';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const navigate = useNavigate()
  const sessionUser = useSelector(state => state.session.user);


  return (
   <div id='navContainer'>
    <div id='logo-container'>
    <img id='logo' src={logo} alt='homey-homes-logo' onClick={() => navigate('/')} />
    <NavLink className='navLink' to="/">homey homes</NavLink>
    </div>
   {isLoaded && (
     <div className='user-menu'>
      <CreateSpotButton user={sessionUser} />
      <ProfileButton user={sessionUser} />
     </div>
   )}

   </div>
    
   
  );
}

export default Navigation;
