import React, {useState, useEffect} from "react";
import "./App.css";


const App = () => {
  // states definitions
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  
  // code allows us to store tasks in local storage as JSON
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  useEffect(() => {
      if(todos.length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos", json);
      }
    }, [todos]);


  // Add the handlesubmit code here
  function handleSubmit(e) {

    // this line seems to prevent a page reload/refresh
    e.preventDefault();

    // get the value of the input box
    let todo = document.getElementById('todoAdd').value

    // seems to be a prototype/class for a todo object
    // use time as id, so its unique to each list item
    // trim the text to exclude whitespace presumably
    // set completed boolean to false, will later enable functionality to change to true
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };

    // append new to do item to array if it had non-zero length
    if (newTodo.text.length > 0 ) {

      // triple dot us property spread notation for enumerable properties
      // seems to concat new todo object to existing array-like data structure
      setTodos([...todos].concat(newTodo));
    } else {
        alert("Enter Valid Task");
    }

    // resets the input box to be empty string
    document.getElementById('todoAdd').value = ""
  }
  
  // Add the deleteToDo code here
  // filter method can be used to remove specific item from array-like
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here
  // iterate/map through each item in todo list.
  // if id matches the one clicked, invert logic of its complete attribute
  // then return this updated object...? and update state of setTodos with updated array-like.
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) 
      {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

// the return of the app includes the html content of webpage
return(

    <div id="todo-list">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id = 'todoAdd'
      />
      <button type="submit">Add Todo</button>
    </form>
  {todos.map((todo) => (
    <div key={todo.id} className="todo">
      <div className="todo-text">
        {/* Add checkbox for toggle complete */}
        <input
          type="checkbox"
          id="completed"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        {/* if it is edit mode, display input box, else display text */}
        {todo.id === todoEditing ?
          (<input
            type="text"
            id = {todo.id}
            defaultValue={todo.text}
          />) :
          (<div>{todo.text}</div>)
        }
      </div>
      <div className="todo-actions">
        {/* if it is edit mode, allow submit edit, else allow edit */}
        {todo.id === todoEditing ?
        (
          <button onClick={() => submitEdits(todo)}>Submit Edits</button>
        ) :
        (
          <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  ))}
  </div>

  // // create a section containing the to-do list
  // <div id="todo-list">
  //   {/* header for the todo list */}
  //   <h1>Todo List</h1>

  //   {/* this is the form that runs the handle function on submit */}
  //   <form onSubmit={handleSubmit}>
  //     <input type="text" id = 'todoAdd'/>
  //     <button type="submit">Add Todo</button>
  //   </form>

  //   {/* this uses map to iterate through each item in array-like structure */}
  //     {todos.map((todo) =>
  //             <div className="todo" key={todo.id}>
  //               <div className="todo-text">{todo.text}
  //               <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
  //               </div>

  //             {/* on button click, call function to delete with this list item id */}
  //             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  //             </div>)
  //     }
  // </div>
  )
};
export default App;
