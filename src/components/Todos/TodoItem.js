import React from 'react';
import { List, Button } from 'antd';

function TodoItem({ todo, onDelete }) {
  return (
    <List.Item
      actions={[
        <Button type="danger" onClick={() => onDelete(todo.id)}>
          Delete
        </Button>
      ]}
    >
      {todo.description} {/* Ensure the correct property name */}
    </List.Item>
  );
}

export default TodoItem;
