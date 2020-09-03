import React, { useState } from 'react';
import "./App.css";

function Todo ({ todo, index, completeTodo, removeTodo, undoneTodo }) {
  return(
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}  
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)} id="completeButton">Done</button>
        <button onClick={() => undoneTodo(index)}>Undone</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm ({ addTodo }){
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input 
        type="text"
        placeholder="Add an item and press Enter"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);  

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const undoneTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <img src="https://fontmeme.com/permalink/200901/e09bd95b1e7ca6d629fd157f7d3da77a.png" alt="My To-do List"/>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            undoneTodo = {undoneTodo}
            removeTodo = {removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}


export default App;