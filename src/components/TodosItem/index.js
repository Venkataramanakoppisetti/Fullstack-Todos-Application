import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './index.css';

function TodosItem({ todo, onDelete }) {
  return (
    <div className="todo-item">
      <span className="todo-description">{todo.description}</span>
      <FaTrash className="delete-icon" onClick={() => onDelete(todo.id)} />
    </div>
  );
}

export default TodosItem;
