import './App.css';

import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import 'flowbite/dist/flowbite.css';

function App() {
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    const user = 'john.doe@atko.email';
    try {
      const response = await fetch(`http://localhost:8000/todos/${user}`);
      const json = await response.json();
      console.log(json);
      setTodos(json);
    }
    catch (err) {
      console.error(err);
    }
  }

  // Load todos 
  useEffect(() => getData, []);

  // // Update todo
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const addTodo = async (todo) => {
    try {
      const response = await fetch(`http://localhost:8000/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });
      console.log("Add response = ", response);
    } catch (error) {
      console.error(error);
    }
    setTodos([...todos, todo]);
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Delete response = ", response);
    } catch (error) {
      console.error(error);
    }

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
      });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      console.log("Update response = ", response);
    }
    catch (error) {
      console.err(error);
    }


  };

  return (
    <div className="container mx-auto p-4">
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default App;
