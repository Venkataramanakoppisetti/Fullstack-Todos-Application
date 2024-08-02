import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message } from 'antd';
import TodosItem from '../TodosItem';
import TodosForm from '../TodosForm'
import './index.css';

function TodosList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/todos', {
          headers: {
            'Authorization': `Bearer ${Cookies.get('jwt_token')}`
          }
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        message.error('Failed to fetch todos.');
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`
        }
      });
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
        message.success('Todo deleted successfully.');
      } else {
        message.error('Failed to delete todo.');
      }
    } catch (error) {
      message.error('Failed to delete todo.');
    }
  };

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    navigate('/register')
  }
 
  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const onLogout = () => {
    navigate('/login');
  };

  return (
    <div className="todo-list-container">
        <TodosForm onAdd={handleAdd} />
        <div className="todo-list">
            {todos.map(todo => (
            <TodosItem key={todo.id} todo={todo} onDelete={handleDelete} />
            ))}
        </div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default TodosList;
