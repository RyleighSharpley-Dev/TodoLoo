"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../helpers/firebaseHelper";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/todos");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen min-h-screen bg-[#212121] text-[#ededed]">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 bg-[#353535] rounded-lg shadow-lg flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-[#d8b4fe]">
            Log In
          </h1>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-600 bg-[#353535] text-[#ededed] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#d8b4fe] focus:border-[#d8b4fe] transition"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full border border-gray-600 bg-[#353535] text-[#ededed] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#d8b4fe] focus:border-[#d8b4fe] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 -translate-y-1/2 flex items-center justify-center text-[#d8b4fe] hover:text-[#9b5de5] focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#7c3aed] text-white py-2 rounded hover:bg-[#9b5de5] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
