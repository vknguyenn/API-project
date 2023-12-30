import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const invalidInput = () => {
    return email.length === 0 
    || username.length < 4 
    || firstName.length === 0 
    || lastName.length === 0 
    || password.length < 6 
    || confirmPassword.length === 0;
  }

  return (
    <div id='signup-container'>
      <h1 id='signup-header'>Sign Up</h1>
      <form className='signup-form' onSubmit={handleSubmit}>
      {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
      {errors.username && <p style={{color:"red"}}>{errors.username}</p>}
      {errors.firstName && <p style={{color:"red"}}>{errors.firstName}</p>}
      {errors.lastName && <p style={{color:"red"}}>{errors.lastName}</p>}
      {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
      {errors.confirmPassword && (<p style={{color:"red"}}>{errors.confirmPassword}</p>)}
        <label>
          <input
            type="text"
            value={email}
            placeholder='Email'
            className='signup-inputs'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            placeholder='Username'
            className='signup-inputs'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            className='signup-inputs'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            className='signup-inputs'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            className='signup-inputs'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            className='signup-inputs'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='signup-button' disabled={invalidInput()}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;