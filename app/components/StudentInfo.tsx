"use client";

import React, { useState, useEffect, useRef } from "react";

// Types for validation rules
type StringValidationRule = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
};

type NumberValidationRule = {
  min?: number;
  max?: number;
};

type ValidationRules = {
  name: StringValidationRule;
  age: NumberValidationRule;
  course: StringValidationRule;
};

// Object for form validation rules
const validationRules: ValidationRules = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]*$/
  },
  age: {
    min: 1,
    max: 100
  },
  course: {
    minLength: 2,
    maxLength: 100
  }
};

// Array of available courses
const availableCourses = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Data Science",
  "Web Development",
  "Mobile Development",
  "Artificial Intelligence"
];

export default function StudentInfo() {
  // Variables and State
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    age: "",
    course: "",
    birthYear: "",
    birthMonth: "",
    birthDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Arrays
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => (1900 + i).toString()
  ).reverse();

  // Functions
  const validateField = (name: string, value: string): string => {
    const rules = validationRules[name as keyof ValidationRules];
    if (!rules) return "";

    if ('minLength' in rules && rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }
    if ('maxLength' in rules && rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }
    if ('pattern' in rules && rules.pattern && !rules.pattern.test(value)) {
      return "Invalid characters";
    }
    if ('min' in rules && rules.min && Number(value) < rules.min) {
      return `Minimum value is ${rules.min}`;
    }
    if ('max' in rules && rules.max && Number(value) > rules.max) {
      return `Maximum value is ${rules.max}`;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentInfo(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    Object.keys(studentInfo).forEach(key => {
      const error = validateField(key, studentInfo[key as keyof typeof studentInfo]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setIsEditing(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmitted(false);
  };

  // DOM Manipulation with useEffect
  useEffect(() => {
    if (isEditing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isEditing]);

  return (
    <div className="text-white">
      {!isEditing ? (
        <div className="space-y-4">
          {submitted ? (
            <div className="p-4 bg-gray-700 rounded border border-gray-600">
              <h3 className="font-bold mb-2">Submitted Information:</h3>
              <p>Name: {studentInfo.name}</p>
              <p>Age: {studentInfo.age}</p>
              <p>Course: {studentInfo.course}</p>
              <p>Date of Birth: {studentInfo.birthDate} {studentInfo.birthMonth} {studentInfo.birthYear}</p>
              <button
                onClick={handleEdit}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Edit Information
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Add Student Information
            </button>
          )}
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-200">
              Student Name:
              <input
                name="name"
                value={studentInfo.name}
                onChange={handleChange}
                type="text"
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </label>
          </div>

          <div>
            <label className="block mb-1 text-gray-200">
              Age:
              <input
                name="age"
                value={studentInfo.age}
                onChange={handleChange}
                type="number"
                min="1"
                max="100"
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </label>
          </div>

          <div>
            <label className="block mb-1 text-gray-200">
              Course:
              <select
                name="course"
                value={studentInfo.course}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Course</option>
                {availableCourses.map((course) => (
                  <option key={course} value={course} className="bg-gray-700">
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-gray-200">
                Birth Year:
                <select
                  name="birthYear"
                  value={studentInfo.birthYear}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-gray-700">
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block mb-1 text-gray-200">
                Birth Month:
                <select
                  name="birthMonth"
                  value={studentInfo.birthMonth}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month} className="bg-gray-700">
                      {month}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block mb-1 text-gray-200">
                Birth Date:
                <input
                  name="birthDate"
                  value={studentInfo.birthDate}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max="31"
                  required
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 