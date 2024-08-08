"use client";
import { FC } from "react";
import { todoType } from "@/types/todoTypes";

interface Props {
  todo: todoType;
  deleteTodoItem: (id: number) => void;
  onClose: () => void;
}

const DeleteTodoModal: FC<Props> = ({ todo, deleteTodoItem, onClose }) => {
  // Event handler for deleting a todo item and closing the modal
  const handleDelete = () => {
    deleteTodoItem(todo.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Delete Todo</h2>
        <p className="mb-4">
          Are you sure you want to delete the todo &quot;{todo.text}&quot;?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
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

export default DeleteTodoModal;
