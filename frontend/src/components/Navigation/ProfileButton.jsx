// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
  
    const toggleMenu = (e) => {
      e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
      setShowMenu(!showMenu);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener('click', closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const closeMenu = () => setShowMenu(false);
  
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
      navigate('/');
    };
  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
    return (
      <>
        <button id='profile' onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
          <i id='profileIcon' className="fas fa-user-circle" />
       </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div className='dropdown-container'>
              <div>Hello, {user.username}</div>
              <li>{user.email}</li>
              <NavLink to="/spots/current" id='manage-page' onClick={closeMenu}>Manage Spots</NavLink>
              <li>
                <button className='logout-dropdown'onClick={logout}>Log Out</button>
              </li>
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      </>
    );
  }
  
  export default ProfileButton;
