"use client";
import { ChangeEvent, FC, useState, useEffect, useCallback } from "react";

interface Props {
  createTodo: (value: string) => void;
  onClose: () => void;
}

const AddTodoModal: FC<Props> = ({ createTodo, onClose }) => {
  // State for handling input value
  const [input, setInput] = useState("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle the "Enter" key press for adding a todo
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && input.trim()) {
        createTodo(input);
        setInput("");
        onClose();
      }
    },
    [input, createTodo, onClose]
  );

  // Attach and clean up the key press event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Rendering the AddTodoModal component
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
        <div className="w-full flex gap-1 mt-2">
          {/* Input field for entering new todo text */}
          <input
            type="text"
            className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
            onChange={handleInput}
            value={input}
          />
          {/* Button for adding a new todo and closing the modal */}
          <button
            className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
            onClick={handleKeyPress as any}
          >
            Add
          </button>
        </div>
        {/* Button for closing the modal */}
        <button
          className="block mt-4 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddTodoModal;
