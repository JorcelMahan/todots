import React, { useState } from 'react';
import './App.css';

const data: Todo[] = [
  {
    id: '123-123-123-123-123',
    title: 'Learn React',
    completed: false,
  },
  {
    id: '222-222-222-222-222',
    title: 'Learn TypeScript',
    completed: false,
  },
  {
    id: '333-333-333-333-333',
    title: 'Learn Redux',
    completed: false,
  },
];

type IdTodo = `${string}-${string}-${string}-${string}-${string}`;

interface Todo {
  id: IdTodo;
  title: string;
  completed: boolean;
}

const Item = ({
  todo,
  deleteTodo,
  editTodo,
}: {
  todo: Todo;
  deleteTodo: (id: IdTodo) => void;
  editTodo: (id: IdTodo, title: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  return (
    <li key={todo.id}>
      {isEditing ? (
        <>
          <input
            type='text'
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <button
            onClick={() => {
              editTodo(todo.id, newTitle);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditing(!isEditing)}>
            <span role='img' aria-label='edit'>
              ✏️
            </span>
          </button>
        </>
      ) : (
        <>
          {todo.title}
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
          <button onClick={() => setIsEditing(!isEditing)}>
            <span role='img' aria-label='edit'>
              ✏️
            </span>
          </button>
        </>
      )}
    </li>
  );
};

function App() {
  const [todos, setTodos] = useState(data);
  const [item, setItem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!item) return;

    const newItem = {
      id: crypto.randomUUID(),
      title: item,
      completed: false,
    };

    setTodos([...todos, newItem]);
    setItem('');
  };

  const deleteTodo = (id: IdTodo): void => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: IdTodo, title: string): void => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <main>
      <h1>Todo App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add todo'
          value={item}
          onChange={handleChange}
        />
        <button type='submit' disabled={!item}>
          Add
        </button>
      </form>

      <ul>
        {todos.map(todo => (
          <Item
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
