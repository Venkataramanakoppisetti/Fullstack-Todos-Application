import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { List, message } from 'antd';
import TodoItem from './TodoItem';
import {Button} from 'antd'

function TodoList() {
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

  const onLogout = () => {
    navigate('/login');
  }

  return (
    <>
      <List
      bordered
      dataSource={todos}
      renderItem={todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      )}
    />
    <Button type='primary' style={{ marginTop: '30px' }} onClick={onLogout}>Logout</Button>
    </>
    
  );
}

export default TodoList;
