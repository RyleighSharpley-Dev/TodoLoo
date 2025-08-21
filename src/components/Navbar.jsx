"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { logout } from "../helpers/firebaseHelper";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = auth.currentUser;

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses =
    "fixed top-0 left-0 w-full z-50 transition-colors duration-300 shadow-md " +
    (scrolled ? "bg-[#212121]" : "bg-transparent");

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-[#ededed]">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#ededed] hover:text-[#d8b4fe] transition"
        >
          TodoLoo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-[#d8b4fe]">
            Home
          </Link>
          {user && (
            <Link href="/todos" className="hover:text-[#d8b4fe]">
              Todos
            </Link>
          )}
          {!user ? (
            <Link href="/sign-up" className="hover:text-[#d8b4fe]">
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-[#ededed]"></span>
          <span className="w-6 h-0.5 bg-[#ededed]"></span>
          <span className="w-6 h-0.5 bg-[#ededed]"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#2a2a2a] text-[#ededed] shadow-md flex flex-col gap-4 px-6 py-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#d8b4fe]"
          >
            Home
          </Link>
          {user && (
            <Link
              href="/todos"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d8b4fe]"
            >
              Todos
            </Link>
          )}
          {!user ? (
            <Link
              href="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d8b4fe]"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
