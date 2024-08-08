"use client";
import { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import { todoType } from "@/types/todoTypes";

interface Props {
  todo: todoType;
  changeTodoText: (id: number, text: string) => void;
  onClose: () => void;
}

const EditTodoModal: FC<Props> = ({ todo, changeTodoText, onClose }) => {
  const [text, setText] = useState(todo.text);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSave = async () => {
    try {
      await changeTodoText(todo.id, text);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
