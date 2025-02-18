import React from "react";
import "./App.css";

const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    React.useEffect(() => { //Get To-do list from Local Storage
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    React.useEffect(() => { //Write To-do list to Local Storage
        if (todos.length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    }, [todos]);

    function handleSubmit(e) { //Add new item to list
        e.preventDefault();
        const newTodo = { 
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };
        if (newTodo.text.length > 0 ) {
            setTodos([...todos].concat(newTodo));
            setTodo("");
        } else {
            alert("Enter Valid Task");
            setTodo("");
        }
    }

    function deleteTodo(id) { //Delete item from list
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function toggleComplete(id) { //Add completed checkbox
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function submitEdits(id) { //Edit list item
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    return ( //Return DOM
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
                        {todo.id === todoEditing ? (
                            <input type="text" onChange={(e) => setEditingText(e.target.value)} />
                        ) : (
                            <div>{todo.text}</div>
                        )}
                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ? (
                            <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                        ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}

                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
