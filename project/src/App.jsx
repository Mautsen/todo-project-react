/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmileWink } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./aboutButton";
import AboutView from "./AboutView";
import HiView from "./HiView";

library.add(faSmileWink);

const Task = ({ task, onDeleteTask, onUpdateTask }) => (
  <div
    key={task.id}
    style={{
      background: "#98c1d9",
      padding: "10px",
      margin: "5px 250px",
      borderRadius: "10px",
      boxShadow: "6px 4px 5px 2px rgba(0, 0, 0, 0.4)",
      borderStyle: "solid",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div>
      <span className="task-name">{task.task}</span> <br />
      {Array.isArray(task.tags) && task.tags.length > 0 && (
        <>
          Tags:{}
          {task.tags.map(
            (tag, index) =>
              tag && (
                <span
                  key={index}
                  style={{
                    marginRight: "5px",
                    padding: "2px 0px",
                    background: "#0b0d3f",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "18px",
                    fontWeight: "",
                    display: "",
                    alignItems: "",
                    paddingLeft: "4px",
                  }}
                >
                  {tag}
                  <button
                    onClick={() => {
                      const updatedTags = task.tags.filter(
                        //AI used here to make this short
                        (_, i) => i !== index
                      );

                      onUpdateTask({ ...task, tags: updatedTags });
                    }}
                    style={{
                      marginLeft: "5px",
                      color: "#fff",
                      background: "#e74c3c",
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 7px",
                      cursor: "pointer",
                    }}
                  >
                    X
                  </button>
                </span>
              )
          )}
        </>
      )}
      Time: {task.timestamp}
    </div>
    <button onClick={() => onDeleteTask(task.id)} style={{ color: "#001f3f" }}>
      Delete
      <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "15px" }} />
    </button>
  </div>
);

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => (
  <div style={{ color: "#3d5a80", display: "flex", flexDirection: "column" }}>
    {tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
      />
    ))}
  </div>
);

const TaskForm = ({ onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTags, setNewTags] = useState([]);

  const handleAddTask = async (event) => {
    event.preventDefault();

    let updatedTask;
    if (newTags.length > 0) {
      const tagsArray = newTags.split(",").map((tag) => tag.trim()); // AI used for the tags to work so that user can add multiple tags
      const uniqueTags = Array.from(new Set(tagsArray)); // User can't add multiple similar tags

      updatedTask = {
        task: newTaskName,
        tags: uniqueTags,
      };
    } else {
      updatedTask = {
        task: newTaskName,
        tags: newTags,
      };
    }

    console.log(updatedTask);

    onAddTask(updatedTask);
    setNewTaskName("");
    setNewTags([]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleAddTask}>
        <label className="form-label">
          Task:
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
          />
          <small>Separate multiple tags with commas</small>
        </label>
        <br />
        <button
          type="submit"
          className="form-button"
          style={{ color: "#001f3f" }}
        >
          Add task
        </button>
      </form>
    </div>
  );
};

const DefaultView = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      let url = "http://localhost:3010/tasks";

      if (searchTerm) {
        url += `?task=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTasks(data.reverse());
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDefaultAddTask = async (newTask) => {
    try {
      const timestamp = new Date().toLocaleString();
      const capitalizedTask =
        newTask.task.charAt(0).toUpperCase() + newTask.task.slice(1);

      if (!capitalizedTask.trim()) {
        console.error("Task name cannot be empty");
        return;
      }

      const response = await fetch("http://localhost:3010/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newTask,
          task: capitalizedTask,

          timestamp,
        }),
      });

      if (response.ok) {
        console.log("Task added successfully");

        fetchData();
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Task deleted successfully");
        fetchData();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:3010/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        console.log("Task updated successfully");
        fetchData();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>
          <FontAwesomeIcon
            icon="fa-solid fa-smile-wink"
            size="1x"
            style={{ paddingRight: "40px" }}
          />
          TO-DO
        </h1>
        <TaskForm onAddTask={handleDefaultAddTask} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <label style={{ color: "#00000", marginRight: "8px" }}>
            Search by task name:&nbsp;
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<DefaultView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/hi" element={<HiView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
