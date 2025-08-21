"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase";
import { logout, fetchUserData } from "../../helpers/firebaseHelper";
import { addTodo, deleteTodo, toggleTodo } from "../../helpers/todoHelper";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Todos() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [todoText, setTodoText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return router.push("/login");
      const data = await fetchUserData(user.uid);
      setUserData(data);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;

    try {
      setLoading(true);
      const newTodo = await addTodo(auth.currentUser.uid, todoText);
      setUserData((prev) => ({
        ...prev,
        todos: [...prev.todos, newTodo],
      }));
      setTodoText("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(auth.currentUser.uid, id);
      setUserData((prev) => ({
        ...prev,
        todos: prev.todos.filter((todo) => todo.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updatedTodo = await toggleTodo(auth.currentUser.uid, id);
      setUserData((prev) => ({
        ...prev,
        todos: prev.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-screen min-h-screen bg-[#212121] text-[#ededed] overflow-y-auto">
      <Navbar />

      <main className="flex flex-col md:flex-row min-h-screen px-4 pt-24 md:pt-32 md:px-16 gap-8">
        {/* Left Column: Todos List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 bg-[#2a2a2a] p-6 rounded-2xl shadow-lg flex flex-col mb-5"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#d8b4fe]">
            {userData ? `Welcome, ${userData.firstName}` : "Loading..."}
          </h2>

          {/* New Todo Input */}
          <form
            onSubmit={handleAddTodo}
            className="flex gap-2 mb-6 backdrop-blur-sm bg-[#3b2f4a]/40 rounded-xl p-2"
          >
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 bg-transparent border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d8b4fe] focus:border-[#d8b4fe] text-[#ededed]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#7c3aed] text-white px-4 py-2 rounded hover:bg-[#9b5de5] transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </form>

          {/* Todos */}
          {userData && userData.todos.length > 0 ? (
            <ul className="space-y-2 overflow-y-auto max-h-96">
              {userData.todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex justify-between items-center p-3 border rounded-lg transition ${
                    todo.completed
                      ? "bg-[#3f3f3f] line-through text-gray-400"
                      : "bg-[#353535] hover:bg-[#3b2f4a]"
                  }`}
                >
                  <span
                    onClick={() => handleToggle(todo.id)}
                    className="cursor-pointer flex-1"
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="ml-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center mt-4">
              No todos yet. Add your first task!
            </p>
          )}

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </motion.div>

        {/* Right Column: Stats / Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/3 p-6 bg-[#2a2a2a] rounded-2xl shadow-lg flex flex-col gap-4 mb-5"
        >
          <h3 className="text-xl font-semibold mb-2 text-[#d8b4fe]">
            Quick Stats
          </h3>
          {userData ? (
            <>
              <p>Total Todos: {userData.todos.length}</p>
              <p>
                Completed:{" "}
                {userData.todos.filter((todo) => todo.completed).length}
              </p>
              <p>
                Pending:{" "}
                {userData.todos.filter((todo) => !todo.completed).length}
              </p>
            </>
          ) : (
            <p>Loading stats...</p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
