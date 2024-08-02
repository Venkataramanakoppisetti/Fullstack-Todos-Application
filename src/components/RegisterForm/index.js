import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'http://localhost:4000/api/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);

    if (response.ok) {
      message.success('Registration successful!');
      navigate('/login');
    } else {
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className='login-container'>
        <form className='form-container' onSubmit={onSubmitRegister}>
          <div>
            <input
              type='text'
              value={username}
              onChange={onChangeUsername}
              id='username'
              placeholder='Enter Username'
            />
            <label htmlFor='username' className='user-inputs'>
              Username
            </label>
          </div>
          <div>
            <input
              type='password'
              value={password}
              onChange={onChangePassword}
              id='password'
              placeholder='Enter Password'
            />
            <label htmlFor='password' className='user-inputs'>
              Password
            </label>
          </div>
          <button className='login-button' type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
