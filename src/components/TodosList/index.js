import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message } from 'antd';
import TodosItem from '../TodosItem';
import TodosForm from '../TodosForm';
import './index.css';

function TodosList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        navigate('/register');
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/todos', {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        message.error(`Failed to fetch todos: ${error.message}`);
      }
    };

    fetchTodos();
  }, [navigate]);

  const handleDelete = async (id) => {
    const jwtToken = Cookies.get('jwt_token');
    if (!jwtToken) {
      navigate('/register');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTodos(todos.filter(todo => todo.id !== id));
      message.success('Todo deleted successfully.');
    } catch (error) {
      message.error(`Failed to delete todo: ${error.message}`);
    }
  };

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
    message.success('Todo added successfully.');
  };

  const onLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <div className="todo-list-container">
      <h1 style={{"color":"#333333","textAlign":"center","font-family": 'Roboto',"font-size":"36px","margin-bottom": "20px"}}>Todo List</h1>
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
