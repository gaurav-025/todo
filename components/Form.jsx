"use client";
import React, { useState } from "react";

function Form({ todos, setTodos }) {
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.todo.value.trim(); // Trim whitespace from input

    // Validation: Check if the input is empty or only whitespace
    if (!value) {
      setErrorMessage("Please enter a valid task name."); // Set error message
      return;
    }

    const newTodo = {
      title: value,
      id: typeof window !== "undefined" ? window.crypto.randomUUID() : Date.now(),
      is_completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]); // Update todos state
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo])); // Update local storage
    event.target.reset(); // Clear input field
    setErrorMessage(""); // Clear any previous error messages
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>

      {/* Centered Submit Button Container */}
      <div className="submit-button-container">
        <button>
          <span className="visually-hidden">Submit</span>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
          >
            <path
              d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
              fillRule="nonzero"
            />
          </svg>
        </button>
      </div>

      {/* Error Message Display */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default Form;
