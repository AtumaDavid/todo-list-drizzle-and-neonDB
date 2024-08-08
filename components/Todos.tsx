"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoTypes";
import Todo from "@/components/Todo";
import AddTodoModal from "@/components/AddTodoModal";
import DeleteTodoModal from "@/components/DeleteTodoModal";
import EditTodoModal from "@/components/EditTodoModal";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todoActions";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<todoType | null>(null);

  const createTodo = async (text: string) => {
    try {
      const id = (todoItems.at(-1)?.id || 0) + 1;
      await addTodo(id, text);
      setTodoItems((prev) => [...prev, { id, text, done: false }]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  const changeTodoText = async (id: number, text: string) => {
    try {
      await editTodo(id, text);
      setTodoItems((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
      setShowEditModal(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const toggleIsTodoDone = async (id: number) => {
    try {
      await toggleTodo(id);
      setTodoItems((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  const deleteTodoItem = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
      setShowDeleteModal(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      {showAddModal && (
        <AddTodoModal
          createTodo={createTodo}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showDeleteModal && selectedTodo && (
        <DeleteTodoModal
          todo={selectedTodo}
          deleteTodoItem={deleteTodoItem}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTodo(null);
          }}
        />
      )}
      {showEditModal && selectedTodo && (
        <EditTodoModal
          todo={selectedTodo}
          changeTodoText={changeTodoText}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTodo(null);
          }}
        />
      )}
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1 mt-4"
        onClick={() => setShowAddModal(true)}
      >
        Add
      </button>
    </main>
  );
};

export default Todos;
