import { useState, useEffect } from 'react';
import { addTodo, getAllTodos, getTodoById,updateTodo, deleteTodoById } from './db';

import './App.css';

type Todo = { id: number; title: string; completed: boolean };

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const init = async () => {
      const defaultTodos = await getAllTodos();
      setTodos(defaultTodos);
    };
    init();
  }, []);
  const [newTodo, setNewTodo] = useState('');

  const add = () => {
    if (!newTodo) return;
    const newTodos = { id: todos.length + 1, title: newTodo, completed: false };
    addTodo(newTodos);
    setTodos([...todos, newTodos]);
    setNewTodo('');
  };
  const completeTodoItem = (id: number) => {
    const target = getTodoById(id);
    if (!target) return;
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        const newTodo = {...todo, completed: !todo.completed}
        updateTodo(newTodo);
        return newTodo;
      }
      return todo
    });
    setTodos(newTodos);
  };
  const deleteTodoItem = (id: number) => {
    deleteTodoById(id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => completeTodoItem(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodoItem(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
      >
        <input
          type='text'
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
