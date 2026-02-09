import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (text === "") return;
    setTasks([...tasks, { name: text, done: false }]);
    setText("");
  }

  function toggleTask(i) {
    const temp = [...tasks];
    temp[i].done = !temp[i].done;
    setTasks(temp);
  }

  const completed = tasks.filter(t => t.done).length;
  const pending = tasks.length - completed;

  return (
    <div className="container">
      <h3>Todo App</h3>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <p>Pending: {pending} | Completed: {completed}</p>

      <ul>
        {tasks.map((t, i) => {
          if (filter === "completed" && !t.done) return null;
          if (filter === "pending" && t.done) return null;

          return (
            <li key={i}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(i)}
              />
              <span className={t.done ? "done" : ""}>{t.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
