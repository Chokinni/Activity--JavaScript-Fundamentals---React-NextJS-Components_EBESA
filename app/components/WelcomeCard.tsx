"use client";

import React, { useState, useEffect, useRef } from "react";

interface WelcomeCardProps {
  name: string;
  onNameChange: (name: string) => void;
}

export default function WelcomeCard({ name, onNameChange }: WelcomeCardProps) {
  const [greeting, setGreeting] = useState("Welcome");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("text-white"); // for name color
  const inputRef = useRef<HTMLInputElement>(null);

  const greetings = ["Welcome", "Hello", "Hi", "Greetings", "Hey"];
  const colors = ["text-blue-400", "text-green-400", "text-purple-400", "text-yellow-400", "text-red-400"];
  const bgColors = ["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-yellow-400", "bg-red-400"];

  const timeGreetings = {
    morning: "Good Morning",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
    night: "Good Night"
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return timeGreetings.morning;
    if (hour >= 12 && hour < 17) return timeGreetings.afternoon;
    if (hour >= 17 && hour < 22) return timeGreetings.evening;
    return timeGreetings.night;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  const handleGreetingClick = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-4 p-6 rounded-lg bg-gray-800 shadow-lg text-white w-full max-w-sm mx-auto">
      <div 
        className="text-2xl font-bold cursor-pointer hover:text-blue-400"
        onClick={handleGreetingClick}
      >
        {greeting}, {getTimeBasedGreeting()}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-300">Name:</span>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            className="p-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        ) : (
          <span
            className={`cursor-pointer ${selectedColor}`}
            onDoubleClick={handleDoubleClick}
          >
            {name}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {bgColors.map((bgColor, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full ${bgColor} cursor-pointer hover:scale-110 transition-transform`}
            onClick={() => {
              setGreeting(greetings[index]);
              setSelectedColor(colors[index]);
            }}
          />
        ))}
      </div>
    </div>
  );
}
