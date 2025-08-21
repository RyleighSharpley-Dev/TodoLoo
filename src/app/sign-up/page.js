"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../helpers/firebaseHelper";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await signUp(formData);
      console.log("Signed up user UID:", user.uid);
      router.push("/todos");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen min-h-screen bg-[#212121] text-[#ededed]">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 bg-[#353535] rounded-lg shadow-lg flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-center mb-4 text-[#d8b4fe]">
            Sign Up
          </h1>

          {/* Map firstName, lastName, email */}
          {["firstName", "lastName", "email"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              required
              className="border border-gray-600 bg-[#353535] text-[#ededed] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#d8b4fe] focus:border-[#d8b4fe] transition"
            />
          ))}

          {/* Password field with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border border-gray-600 bg-[#353535] text-[#ededed] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#d8b4fe] focus:border-[#d8b4fe] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-[#d8b4fe] hover:text-[#9b5de5] focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#7c3aed] text-white py-2 rounded hover:bg-[#9b5de5] transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          Already have an account?{" "}
          <a href="/login" className="text-[#d8b4fe] hover:underline">
            Log In
          </a>
        </motion.p>
      </main>
    </div>
  );
}
