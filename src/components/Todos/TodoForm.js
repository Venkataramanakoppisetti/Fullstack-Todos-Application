import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import Cookies from 'js-cookie';

const { Option } = Select;

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async () => {
    if (!text) {
      message.error('Please enter a todo item.');
      return;
    }

    try {
      console.log('Submitting:', { description: text, status });
      const response = await fetch('http://localhost:4000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify({ description: text, status })
      });

      if (response.ok) {
        const newTodo = await response.json();
        console.log('New Todo:', newTodo);
        onAdd(newTodo);
        setText('');
        setStatus('pending');
        message.success('Todo added successfully.');
      } else {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        message.error('Failed to add todo.');
      }
    } catch (error) {
      console.error('Catch error:', error);
      
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a todo"
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          placeholder="Select status"
        >
          <Option value="pending">Pending</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TodoForm;
  