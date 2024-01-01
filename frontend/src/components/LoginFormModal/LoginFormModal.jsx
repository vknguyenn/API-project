// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors)
      }
    })

  }

  return (
    <div id='login-container'>
      <h1 className='login-header'>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
      {errors.credential && (
          <p style={{color:"red"}}>{errors.credential}</p>
        )}
        <label>
          <input
            className='username-input'
            type="text"
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className='password-input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
       
        <button id='login-button' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <button id='demo-button' onClick={demoUser}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;