import React, { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    addTodo({ id: Date.now(), text: input, isComplete: false, priority: 'low' });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <TextInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
        className="flex-1"
      />
      <Button className='bg-blue-500' type="submit">Add Task</Button>
    </form>
  );
};

export default TodoForm;
