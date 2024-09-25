import { useState, useRef, useEffect } from "react";
import "./TodoCard.css";
import Modal from "../Modal/Modal.jsx";
import EditTaskModal from "../EditTaskModal/EditTaskModal.jsx";
import Button from "../Button/Button.jsx";

export default function TodoCard() {
  const modal = useRef();
  const editTaskModal = useRef();
  const enteredTask = useRef();
  const editedTask = useRef();
  // function to handle click of Add button
  function openModal() {
    // show modal
    modal.current.open();
  }
  // array of entered tasks
  const [taskArray, setTaskArray] = useState([]);
  // Function to save the array of objects to localStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("localStorageTaskArray", JSON.stringify(data));
  };

  // function to get task entered by user and push it to task array and local storage
  function handleSaveTaskClick() {
    if (enteredTask.current.value.trim() !== "") {
      const newTask = {
        taskName: enteredTask.current.value,
        taskId: Math.random(),
      };
      const updatedTaskArray = [...taskArray, newTask];
      setTaskArray(updatedTaskArray);
      saveToLocalStorage(updatedTaskArray);
    }
  }

  // function to setTaskArray from localStorage
  const loadFromLocalStorage = () => {
    const savedItems = localStorage.getItem("localStorageTaskArray");
    if (savedItems) {
      setTaskArray(JSON.parse(savedItems));
    }
  };
  useEffect(() => {
    loadFromLocalStorage(); // Load tasks
  }, []);

  // reset entered text on form submit
  function handleOnSubmit(event) {
    event.target.reset();
  }

  // function to delete a task
  function handleDeleteTask(taskId) {
    const removeTask = taskArray.filter((task) => {
      return task.taskId !== taskId;
    });
    setTaskArray(removeTask);
    saveToLocalStorage(removeTask);
  }

  // function to edit a task
  let currentTaskId = "";
  let currentTaskName = "";
  function handleEditTask(taskId, taskName) {
    currentTaskId = taskId;
    currentTaskName = taskName;
    editTaskModal.current.open();
  }

  // function to edit task
  function handleSaveEdit() {
    const editedTasArray = taskArray.map((task) => {
      if (
        task.taskId === currentTaskId &&
        editedTask.current.value.trim() !== ""
      ) {
        return {
          ...task,
          taskName: editedTask.current.value,
          taskId: currentTaskId,
        };
      }
      return task;
    });
    setTaskArray(editedTasArray);
    saveToLocalStorage(editedTasArray);
  }

  // show fallback text if task array is empty else show tasks
  let todoCardContent = <p className="fallback-text">Add some tasks...</p>;
  if (taskArray.length > 0) {
    todoCardContent = (
      <ul className="todo-card__list">
        {taskArray.map((obj) => (
          <li key={obj.taskId} className="todo-card__list-item">
            <div className="todo-card__list-item__task">
              <input type="checkbox" id={obj.taskId} />
              <label htmlFor={obj.taskId}>{obj.taskName}</label>
            </div>
            <div className="todo-card__list-item__action">
              {/* edit button */}
              <Button
                buttonType={"editBtn"}
                cssClass={"btn todo-card__list-item-btn"}
                onSelect={() => handleEditTask(obj.taskId, obj.taskName)}
              />
              {/* delete button */}
              <Button
                buttonType={"deleteBtn"}
                cssClass={"btn todo-card__list-item-btn"}
                onSelect={() => handleDeleteTask(obj.taskId)}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <EditTaskModal ref={editTaskModal}>
        <form method="dialog" className="modal-form" onSubmit={handleOnSubmit}>
          <div className="control__row">
            <label className="model-form__label" htmlFor="task">
              Edit Task
            </label>
            <input
              className="model-form__input"
              type="text"
              id="task"
              ref={editedTask}
              //todo-'set default value to input field when edit modal opens' defaultValue={}
              defaultValue={currentTaskName}
            />
          </div>
          <div className="modal-form__actions">
            <button
              className="btn modal-form__btn"
              type="submit"
              onClick={handleSaveEdit}
            >
              Save Edit
            </button>
            <button className="btn modal-form__btn" type="submit">
              Cancel
            </button>
          </div>
        </form>
      </EditTaskModal>
      <Modal ref={modal}>
        <form method="dialog" onSubmit={handleOnSubmit} className="modal-form">
          <div className="control__row">
            <label className="model-form__label" htmlFor="task">
              Add Task
            </label>
            <input
              className="model-form__input"
              type="text"
              id="task"
              ref={enteredTask}
            />
          </div>
          <div className="modal-form__actions">
            <button
              className="btn modal-form__btn"
              type="submit"
              onClick={handleSaveTaskClick}
            >
              Save
            </button>
            <button className="btn modal-form__btn" type="submit">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <div className="todo-card-wrap">
        <div className="todo-card">
          {/* display todo card content */}
          {todoCardContent}
          {/* Add Task button */}
          <button
            onClick={openModal}
            className="btn todo-card__add-task-btn"
            type="button"
          >
            <span className="todo-card__add-task-icon">+</span>
          </button>
        </div>
      </div>
    </>
  );
}
