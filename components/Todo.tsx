"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoTypes";
import EditTodoModal from "./EditTodoModal";

interface Props {
  todo: todoType;
  changeTodoText: (id: number, text: string) => Promise<void>;
  toggleIsTodoDone: (id: number) => Promise<void>;
  deleteTodoItem: (id: number) => Promise<void>;
}

const Todo: FC<Props> = ({
  todo,
  changeTodoText,
  toggleIsTodoDone,
  deleteTodoItem,
}) => {
  const [isDone, setIsDone] = useState(todo.done);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleIsDone = async () => {
    try {
      await toggleIsTodoDone(todo.id);
      setIsDone((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveText = async (id: number, newText: string) => {
    try {
      await changeTodoText(id, newText);
      setShowEditModal(false); // Close the modal after saving
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTodoItem(todo.id);
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-gray-200 border-solid border rounded-lg">
      <input
        type="checkbox"
        className="text-blue-200 rounded-sm h-4 w-4"
        checked={isDone}
        onChange={handleIsDone}
      />
      <span className={`${todo.done ? "line-through" : ""} w-full`}>
        {todo.text}
      </span>
      <div className="flex gap-1 ml-auto">
        <button
          onClick={handleEdit}
          className="bg-blue-400 text-blue-50 rounded w-14 px-2 py-1"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
        >
          Delete
        </button>
      </div>

      {showEditModal && (
        <EditTodoModal
          todo={todo}
          changeTodoText={handleSaveText}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default Todo;
