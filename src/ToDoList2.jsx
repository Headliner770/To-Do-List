import { useState } from "react";
import { Input } from "./Input";

const TODOS = [
  { id: 1, title: "Купить кофе", isCompleted: false },
  { id: 2, title: "Помыть авто", isCompleted: false },
  { id: 3, title: "Пожарить гвоздей", isCompleted: false },
];

export default function ToDoList() {
  const [tasks, setTasks] = useState(TODOS);
  // const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  console.log("tasks PARENT", tasks);

  function handleEditChange(event) {
    setEditTask(event.target.value);
  }

  function addTask(newTaskTitle) {
    const trimmedNewTask = newTaskTitle.trim();

    if (trimmedNewTask) {
      setTasks((prevState) => [
        ...prevState,
        { id: Date.now(), title: trimmedNewTask, isCompleted: false },
      ]);
    }
  }

  // function editTaskHandler(id) {
  //   setEditId(id);
  //   setEditTask(tasks[id].title);
  // }


  // function toggleTaskCompletion(id) {
  //   setTasks((prevTasks) => ({
  //     ...prevTasks,
  //     [id]: { ...prevTasks[id], isCompleted: !prevTasks[id].isCompleted },
  //   }));
  // }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        {/* <input
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button> */}
        <Input addTask={addTask} />

        <ol>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                backgroundColor: task.isCompleted ? "rgb(2, 159, 2)" : "white",
              }}
            >
              <span className="text">{task.title}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
