import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    navigate('/');
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'http://localhost:4000/api/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const jwtToken = data.token;

    if (jwtToken === undefined) {
      navigate('/register')
    }

    if (response.ok && jwtToken) {
      onSubmitSuccess(jwtToken);
    } else {
      message.error('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className='container'>
      <div className='login-container'>
        <form className='form-container' onSubmit={onSubmitLogin}>
          <div>
            <input
              type='text'
              value={username}
              onChange={onChangeUsername}
              id='username'
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
            />
            <label htmlFor='password' className='user-inputs'>
              Password
            </label>
          </div>
          <button className='login-button' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
