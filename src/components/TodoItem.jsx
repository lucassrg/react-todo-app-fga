import React, { useState } from 'react';
import { Button, Dropdown } from 'flowbite-react';

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState(todo.priority);

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    updateTodo(todo.id, { ...todo, priority: newPriority });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{todo.text}</span>
      <span>{todo.priority}</span>

      {isEditing ? (
        <div className='flex flex-row gap-2'>
          <Button className='bg-green-500' onClick={() => handlePriorityChange('low')}>Low</Button>
          <Button className='bg-yellow-500' onClick={() => handlePriorityChange('medium')}>Medium</Button>
          <Button className='bg-red-500'  onClick={() => handlePriorityChange('high')}>High</Button>
        </div>
      ) : (
        <div className='flex flex-row gap-2'>
          <Button className='bg-blue-500' onClick={() => setIsEditing(true)}>Edit</Button>
          <Button color="failure" onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;