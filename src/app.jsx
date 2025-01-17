import { createSignal } from "solid-js";

function App() {
    const [todos, setTodos] = createSignal([]);
    const [newTodo, setNewTodo] = createSignal("");

    const addTodo = () => {
        if (newTodo().trim() === "") return;
        setTodos([...todos(), { text: newTodo(), completed: false }]);
        setNewTodo("");
    };

    const toggleTodo = (index) => {
        setTodos(
            todos().map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (index) => {
        setTodos(todos().filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>ToDo App</h1>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo()}
                    onInput={(e) => setNewTodo(e.target.value)}
                    style={{ padding: "5px", width: "200px" }}
                />
                <button onClick={addTodo} style={{ marginLeft: "5px", padding: "5px" }}>
                    Add
                </button>
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {todos().map((todo, index) => (
                    <li
                        key={index}
                        style={{
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(index)}
                        />
                        <span
                            style={{
                                marginLeft: "10px",
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}
                        >
              {todo.text}
            </span>
                        <button
                            onClick={() => deleteTodo(index)}
                            style={{ marginLeft: "auto", padding: "5px" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
