"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative w-screen">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="relative w-screen h-screen"
      >
        <Navbar />
        {/* Background Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Hero content */}
        <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 mt-20">
          <div className="max-w-xl">
            {/* Typewriter Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-[#d8b4fe] mb-6">
              <Typewriter
                words={["Stay Organized, Stay Productive"]}
                loop={1}
                cursor
                cursorStyle="."
                typeSpeed={100}
                deleteSpeed={50}
              />
            </h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
              className="text-lg md:text-xl text-gray-300 mb-8"
            >
              TodoLoo helps you manage your tasks easily. Sign up, It's the best
              way To Do
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
            >
              <Link
                href="/sign-up"
                className="bg-[#7c3aed] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#9b5de5] transition"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
