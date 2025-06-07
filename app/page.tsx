"use client";

import WelcomeCard from "./components/WelcomeCard";
import Counter from "./components/Counter";
import StudentInfo from "./components/StudentInfo";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [welcomeName, setWelcomeName] = useState("Chucky");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">HELLO WORLD</h1>
          <p className="text-gray-300 text-lg">Welcome to my Website</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Welcome Card Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-white mb-4">Welcome</h2>
            <WelcomeCard name={welcomeName} onNameChange={setWelcomeName} />
          </div>

          {/* Counter Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-white mb-4">Interactive Counter</h2>
            <Counter />
          </div>

          {/* Student Info Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-white mb-4">Student Information</h2>
            <StudentInfo />
          </div>
        </div>

        {/* Video Button */}
        <div className="text-center mt-12">
          <Link 
            href="/video" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            OPEN
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400">
          <p>Built with React and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
