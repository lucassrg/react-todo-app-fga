import React, { useState } from 'react';
import { Button, Dropdown } from 'flowbite-react';
import PriorityButton from './PriorityButton';
import StatusButton from './StatusButton';
import { HiOutlineTrash } from 'react-icons/hi';

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [priority, setPriority] = useState(todo.priority);

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span className='text-slate-500 hover:text-blue-600'>{todo.title}</span>            
      <PriorityButton todo={todo} updateTodo={updateTodo}></PriorityButton>
      <StatusButton todo={todo} updateTodo={updateTodo}></StatusButton>  

      <div className='flex flex-row gap-2'>
      <Button color="failure" onClick={() => deleteTodo(todo.id)}>Delete <HiOutlineTrash className="mr-2 h-5 w-5"/></Button>
      </div>
    </div>
  );
};

export default TodoItem;