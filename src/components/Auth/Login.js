import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Form, Input, Button, message } from 'antd';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    const jwtToken = data.token;

    if (response.ok && jwtToken) {
      Cookies.set('jwt_token', jwtToken, { expires: 30 });
      navigate('/todos');
    } else {
      message.error('Login failed. Please check your username and password.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '50px' }}>
      <h2>Login</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
