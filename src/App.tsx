import { useState, useEffect } from 'react';
import './App.css';

type Todo = { id: number; title: string; completed: boolean };

const request = indexedDB.open('TodoList',3);
request.onupgradeneeded = (event:IDBVersionChangeEvent) => {
  const res = (event.target as IDBOpenDBRequest).result;
  const db = res.createObjectStore('todos', {keyPath: 'id'});
  db.createIndex
}
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    setTodos([
      { id: 1, title: 'Learn React', completed: false },
      { id: 2, title: 'Learn TypeScript', completed: false },
      { id: 3, title: 'Learn Next.js', completed: false}
    ])
  }, [])
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {};
  const completeTodoItem = (id:number) => {
    console.log('id :>> ', id);
  };
  const deleteTodoItem = (id: number) => {
    console.log('id :>> ', id);
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
          addTodo();
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
