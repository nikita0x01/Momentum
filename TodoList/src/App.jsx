import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [pastTasks, setPastTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask }]);
    setNewTask("");
  };

  // Mark as done -> move to past activity
  const markAsDone = (index) => {
    const doneTask = tasks[index];
    setPastTasks([
      ...pastTasks,
      { text: doneTask.text, status: "Success", date: "Today" },
    ]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app-wrapper">
      <div className="main-container">
        <header>
          <h2>Momentum-Progress starts here</h2>
          <span className="today">Make it happen</span>
        </header>

        {/* Input area */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>+</button>
        </div>

        {/* Task list */}
        <section className="task-section">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks yet. Add something!</p>
          ) : (
            tasks.map((task, index) => (
              <div key={index} className="task-card">
                <span className="icon">📍</span>
                <p>{task.text}</p>
                <div className="task-actions">
                  <button
                    className="done-btn"
                    onClick={() => markAsDone(index)}
                  >
                    ✓
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(index)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Past activity */}
        <h3 className="past-title">Past Activity</h3>
        <section className="past-section">
          {pastTasks.length === 0 ? (
            <p className="empty-text">No past activity yet.</p>
          ) : (
            pastTasks.map((task, index) => (
              <div key={index} className="past-card">
                <div className="past-left">
                  <span className="date">{task.date}</span>
                  <p>{task.text}</p>
                </div>
                <span
                  className={`status ${
                    task.status === "Success" ? "success" : "missing"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
