import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './index.css';

function TodosItem({ todo, onDelete }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };
  return (
    <div className="todo-item">
      <span className={`status-indicator ${getStatusClass(todo.status)}`}></span>
      <span className="todo-description">{todo.description}</span>
      <FaTrash className="delete-icon" onClick={() => onDelete(todo.id)} />
    </div>
  );
}

export default TodosItem;
