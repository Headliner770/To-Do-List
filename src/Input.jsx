import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const Input = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  return (
    <>
      <input
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
      />
      <button
        className="add-button"
        onClick={() => {
          addTask(newTask);
          setNewTask("");
        }}
      >
        Add
      </button>
    </>
  );
};
