import { useState } from "react";
import { Input } from "./Input";
// import useInput from "./useInput";

const TODOS = [
  { id: 3, title: "Купить кофе", isCompleted: false },
  { id: 4, title: "Помыть авто", isCompleted: false },
  { id: 1, title: "Пожарить гвоздей", isCompleted: false },
  { id: 2, title: "Выбросить мусор", isCompleted: false },
];

export default function ToDoList() {
  const [tasks, setTasks] = useState(TODOS);
  // const input = useInput(); //кастомный хук (Минин)
  const [directionSort, serDirectionSort] = useState(true);
  // const [newTask, setNewTask] = useState("");
  // const [editId, setEditId] = useState(null);
  // const [editTask, setEditTask] = useState("");

  console.log("tasks PARENT", tasks);

  // function handleEditChange(event) {
  //   setEditTask(event.target.value);
  // }

  function addTask(newTaskTitle) {
    const trimmedNewTask = newTaskTitle.trim();

    if (trimmedNewTask) {
      setTasks((prevState) => [
        ...prevState,
        { id: Date.now(), title: trimmedNewTask, isCompleted: false }, //генерим id
      ]);
    }
  }

  // function editTaskHandler(id) {
  //   setEditId(id);
  //   setEditTask(tasks[id].title);
  // }

  // ф-я с параметром id
  function toggleTaskCompletion(id) {
    //ф-я для обновл сост сп-ка задач (prevTasks)
    setTasks((prevTasks) =>
      // метод map проходит по каждому элементу (задаче) в массиве prevTasks.
      prevTasks.map((task) =>
        // совпад id
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  }

  // Сорт А - Я и Я - А
  function sortedTasks() {
    const sortedTasks = [...tasks].sort(
      (a, b) =>
        directionSort
          ? a.title.localeCompare(b.title) // А - Я
          : b.title.localeCompare(a.title) // Я - А
    );
    setTasks(sortedTasks);
    serDirectionSort(!directionSort); // Меняем направление сортировки
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

        <button onClick={sortedTasks} style={{ color: "black" }}>
          A-Я / Я-А
        </button>

        <ol>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                backgroundColor: task.isCompleted ? "rgb(2, 159, 2)" : "white",
              }}
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTaskCompletion(task.id)}
                // className="control"
                // {...input}
              />

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
