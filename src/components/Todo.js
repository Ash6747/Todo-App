import React, { useState, useEffect } from 'react';
import Reset from '../img/refresh.png';
import { saveTodos, loadTodos } from './todoData'; // Import the data handling functions

const Todos = () => {
  const [todos, setTodos] = useState(loadTodos());
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [nextId, setNextId] = useState(1); // Track the next available ID

  useEffect(() => {
    // Load todos from local storage when the component mounts
    const storedTodos = loadTodos();
    if (storedTodos) {
      setTodos(storedTodos);
      // Find the highest ID to calculate the next available ID
      const maxId = storedTodos.reduce((max, todo) => {
        return todo.id > max ? todo.id : max;
      }, 0);
      setNextId(maxId + 1);
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever the todos state changes
    saveTodos(todos);
  }, [todos]);

  const addTodo = () => {
    if (todoTitle.trim() === '' || todoDescription.trim() === '') return;
    const newTodo = {
      id: nextId, // Assign the next available ID
      title: todoTitle,
      description: todoDescription,
      completed: false,
      timestamp: new Date().getTime(), // Add a timestamp for sorting
    };
    setTodos([newTodo, ...todos]); // Add new todo at the beginning
    setNextId(nextId + 1); // Increment the next available ID
    setTodoTitle('');
    setTodoDescription('');
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = () => {
    if (todoTitle.trim() === '' || todoDescription.trim() === '') return;
    const updatedTodos = [...todos];
    updatedTodos[editIndex].title = todoTitle;
    updatedTodos[editIndex].description = todoDescription;
    setTodos(updatedTodos);
    setEditIndex(-1);
    setTodoTitle('');
    setTodoDescription('');
  };

  const resetTodos = () => {
    // Clear all todos and remove them from local storage
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const sortByCreation = (a, b) => {
    return b.timestamp - a.timestamp; // Sort by most recent creation timestamp
  };

  const sortByCompletion = (a, b) => {
    if (a.completed === b.completed) {
      return b.timestamp - a.timestamp; // Sort completed todos by most recent completion timestamp
    } else {
      return a.completed ? 1 : -1; // Active todos should come before completed todos
    }
  };

  const handleKey= (e) =>{
      e.code === "Enter" && addTodo();
  }
  return (
    <div className='todo_container'>
      <h1 className='header'>TODO App</h1>
      <button onClick={resetTodos} className="reset" >
        <img src={Reset} alt='Reset'/>
      </button>
      <div className='input_container'>
        <input
            className='title_input'
            type="text"
            placeholder="Title"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            onKeyDown={handleKey}
        />
        <input
            className='description_input'
            type="text"
            placeholder="Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            onKeyDown={handleKey}
        />
      </div>
      <div className='button_container'>
            {editIndex !== -1 ? (
                <>

                    <button onClick={updateTodo} className="button-50">Update</button>
                    <button onClick={() =>{
                        setTodoDescription('');
                        setTodoTitle('');
                        setEditIndex(-1);
                        }} className="button-50">Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={addTodo} className="button-50">Add</button>
                </>
            )}
      </div>
      
      <ul>
        {todos.sort(sortByCompletion).map((todo, index) => (
            
          <li
            key={index}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <div className='list_content'>
                <input
                  id='checkbox'
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => completeTodo(todo.id)} // Pass the ID to completeTodo
                />
                <strong className='todo_title'>{todo.title}: </strong>{todo.description}
            </div>
            
            <div>
              {!todo.completed && (
                <button 
                onClick={() =>{
                    setTodoTitle(todo.title);
                    setTodoDescription(todo.description);
                    setEditIndex(index);
                }} className="button-50">Edit</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
