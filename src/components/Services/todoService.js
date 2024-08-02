import Cookies from 'js-cookie';
const API_URL = 'http://localhost:4000/api';



export const getTodos = async () => {
  const jwtToken = Cookies.get('jwt_token');
  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  });
  return await response.json();
};

export const createTodo = async (description) => {
  const jwtToken = Cookies.get('jwt_token');
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({ description, status: 'pending' })
  });
  return await response.json();
};

export const updateTodo = async (id, status) => {
  const jwtToken = Cookies.get('jwt_token');
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({ status })
  });
  return await response.json();
};

export const deleteTodo = async (id) => {
  const jwtToken = Cookies.get('jwt_token');
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  });
};
