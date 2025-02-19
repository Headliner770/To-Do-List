import React, { useState } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Купить кофе", isCompleted: false },
    { id: 2, title: "Помыть авто", isCompleted: false },
    { id: 3, title: "Пожарить гвоздей", isCompleted: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditChange(event) {
    setEditTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newId = Object.keys(tasks).length // Object.keys(tasks) — команда, берет объект tasks и возвращает массив (список) всех ключей (id) этого объекта. length покажет сколько элем в массиве
        ? Math.max(...Object.keys(tasks).map(Number)) + 1
        : 1; // генерация нового ID
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newId]: { title: newTask, isCompleted: false },
      }));
      setNewTask("");
    }
  }

  function editTaskHandler(id) {
    setEditId(id);
    setEditTask(tasks[id].title);
  }

  function saveTask(id) {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [id]: { ...prevTasks[id], title: editTask }, // Обновляем текст задачи
    }));
    setEditId(null);
  }

  function toggleTaskCompletion(id) {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [id]: { ...prevTasks[id], isCompleted: !prevTasks[id].isCompleted },
    }));
  }

  function deleteTask(id) {
    const { [id]: _, ...updatedTasks } = tasks; // Удаляем задачу по ID
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
        <ol>
          {Object.keys(tasks).map((id) => (
            <li
              key={id}
              style={{
                backgroundColor: tasks[id].isCompleted
                  ? "rgb(2, 159, 2)"
                  : "white",
              }}
            >
              <input
                type="checkbox"
                checked={tasks[id].isCompleted}
                onChange={() => toggleTaskCompletion(id)}
              />
              {editId === id ? (
                <>
                  <input
                    type="text"
                    value={editTask}
                    onChange={handleEditChange}
                  />
                  <button className="save-button" onClick={() => saveTask(id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="text">{tasks[id].title}</span>
                  <button
                    className="edit-button"
                    onClick={() => editTaskHandler(id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
