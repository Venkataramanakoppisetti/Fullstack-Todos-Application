import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';
import './index.css';

function TodosForm({ onAdd }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const data = await response.json();

      if (response.ok) {
        console.log('New Todo:', data);
        onAdd(data); // Call onAdd with the new todo item
        setText('');
        setStatus('pending');
      } else {
        console.error('Error response:', data);
        message.error('Failed to add todo.');
      }
    } catch (error) {
      console.error('Catch error:', error);
      message.error('An error occurred while adding the todo.');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a todo"
        />
      </div>
      <div className="form-group">
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button className="form-button" type="submit">Add Todo</button>
    </form>
  );
}

export default TodosForm;
