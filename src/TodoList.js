import React, {useState} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Inputs from "./components/Inputs";
import Modal from "./components/Modal";
import './TodoList.css';

const fetchTodos = async() => {
  const response = await fetch('/api/todos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const todos = await response.json();

  return todos.map(todo => ({
    id: todo._id,
    text: todo.text,
    completed: todo.completed,
  }));
};

const addTodo = async (newTodo) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
};

const updateTodo = async(updatedTodo) => {
  const response = await fetch(`/api/todos/${updatedTodo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  };
  return response.json();
};

const deleteTodo = async(id) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return id;
};

const deleteAllTodos = async () => {
  const response = await fetch('http://localhost:5000/api/todos', {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete all todos');
  }
  return true;
};

export function TodoList() {
  const [newTodoTxt, setNewTodoTxt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTxt('');
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsModalOpen(false);
      setEditingTodo(null);
      setEditingText('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const deleteAllMutation = useMutation({
    mutationFn: deleteAllTodos,
    onSuccess: () => {
      console.log('Delete all todos success');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Delete all todos error:', error);
    }
  });

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all todos?')) {
      deleteAllMutation.mutate();
    }
  };

  const handleAddTodo = () => {
    if (newTodoTxt.trim() === '') return;
    addMutation.mutate({ text: newTodoTxt, completed: false });
  }

  const handleToggleCompleted = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateMutation.mutate(updatedTodo);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditingText(todo.text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    setEditingText('');
  };

  const handleSave = () => {
    if (editingText.trim() === '') return;
    const updatedTodo = { ...editingTodo, text: editingText };
    updateMutation.mutate(updatedTodo);
  };

  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>Error: {error.message}</div>

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="input-container">
        <Inputs
          className="todo-input"
          type="text"
          value={newTodoTxt}
          onChange={(e) => setNewTodoTxt(e.target.value)}
          placeholder="Add new todo"
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      <ul className={`todo-container${isModalOpen ? ' disabled' : ''}`}>
        {todos.filter(todo => todo && todo.id !== undefined).map((todo, index) => (
          <li className="todo-item" key={todo._id ?? index} >
            <Checkbox
              checked={todo.completed}
              onChange={(e) => {
                e.preventDefault();
                if (todo.id !== undefined) {
                  handleToggleCompleted(todo);
                }
              }}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <div className="todo-btn">
              {!todo.completed && (
                <Button variant="primary" className="update-btn" onClick={() => openEditModal(todo)}>Update</Button>
              )}
              <Button variant='danger' onClick={() => {
                if (todo.id !== undefined) {
                  handleDelete(todo.id);
                }
              }}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="delete-all-container">
        <Button variant="danger" onClick={handleDeleteAll}>Clear All</Button>
      </div>
      <div className="modal-menu">
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Todo">
          <Inputs
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            placeholder="Edit todo text"
          />
          <div className="modal-btn">
            <Button variant="primary" className="save-btn" onClick={handleSave}>Save</Button>
            <Button className="delete-btn" onClick={closeModal}>Cancel</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
