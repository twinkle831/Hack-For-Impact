import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserMd, FaRobot, FaLaptopCode, FaMobileAlt, FaShieldAlt, FaCode } from "react-icons/fa";

// 🔹 Career Roadmap Data
const careerRoadmaps = {
  "Doctor": [
    { step: 1, task: "Learn Biology & Chemistry Basics", xp: 100, resources: ["Khan Academy"], projects: ["Research on Human Anatomy"] },
    { step: 2, task: "Prepare for Medical Exams (NEET)", xp: 250, resources: ["NEET Guide"], projects: ["Mock Tests & Practice Exams"] },
    { step: 3, task: "MBBS & Clinical Practice", xp: 500, resources: ["Medical Colleges"], projects: ["Case Study on Patient Diagnosis"] },
    { step: 4, task: "Specialization & Residency", xp: 1000, resources: ["PG Courses"], projects: ["Work in a Hospital"] },
  ],
  "Machine Learning Developer": [
    { step: 1, task: "Learn Python & Math", xp: 100, resources: ["Coursera - ML Basics"], projects: ["Build a Simple Linear Regression Model"] },
    { step: 2, task: "Deep Learning & AI", xp: 250, resources: ["Fast.ai"], projects: ["Train an AI Model on Image Data"] },
    { step: 3, task: "Deploy AI Models", xp: 500, resources: ["AWS AI Services"], projects: ["Deploy AI Chatbot on Flask"] },
    { step: 4, task: "Research in AI", xp: 1000, resources: ["AI Papers"], projects: ["Work on AI Research with Professors"] },
  ],
  "Web Developer": [
    { step: 1, task: "HTML, CSS & JS Basics", xp: 100, resources: ["MDN Docs"], projects: ["Build a Personal Portfolio"] },
    { step: 2, task: "React.js & Advanced JS", xp: 250, resources: ["Udemy - React Course"], projects: ["Create a To-Do App"] },
    { step: 3, task: "Backend & Databases", xp: 500, resources: ["Node.js, Express, MongoDB"], projects: ["Build a Blog Website"] },
    { step: 4, task: "Full-Stack Development", xp: 1000, resources: ["Full-Stack Bootcamp"], projects: ["Launch a Real-World App"] },
  ]
};

// 🔹 Career Options with Icons
const careerOptions = [
  { name: "Doctor", icon: <FaUserMd className="text-6xl text-red-500" /> },
  { name: "Machine Learning Developer", icon: <FaRobot className="text-6xl text-yellow-400" /> },
  { name: "Web Developer", icon: <FaLaptopCode className="text-6xl text-blue-400" /> },
  { name: "App Developer", icon: <FaMobileAlt className="text-6xl text-green-400" /> },
  { name: "Blockchain Developer", icon: <FaCode className="text-6xl text-purple-400" /> },
  { name: "Penetration Tester", icon: <FaShieldAlt className="text-6xl text-gray-400" /> },
];

// 🔥 Single Function Export
const LearningRoadmap = () => {
  const [age, setAge] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const navigate = useNavigate();

  // 🔹 Scroll Animation Effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCareer]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-cyan-300">🎮 Choose Your Career Path</h1>

      {/* Age Input */}
      <input
        type="number"
        placeholder="Enter your age"
        className="mt-6 p-3 text-lg bg-gray-800 text-white rounded border border-gray-600"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      {/* Career Selection */}
      {!selectedCareer ? (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {careerOptions.map((career, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform transition-all hover:scale-105 hover:bg-gray-700 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCareer(career.name)}
            >
              {career.icon}
              <h3 className="text-xl font-bold mt-3">{career.name}</h3>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
              >
                View Career Roadmap →
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-10 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-green-300 text-center">🚀 {selectedCareer} Learning Roadmap</h2>
          
          <div className="relative mt-10 flex flex-col items-center">
            {careerRoadmaps[selectedCareer]?.map((step, index) => (
              <motion.div
                key={index}
                className="relative w-full max-w-3xl text-center mb-10 bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <h3 className="text-xl font-bold text-yellow-300">🏆 Level {step.step}</h3>
                <p className="text-green-300">🛠 Task: {step.task}</p>
                <p className="text-gray-400">📚 Resources: {step.resources.join(", ")}</p>
                <p className="text-blue-300">📝 Project: {step.projects.join(", ")}</p>
                <p className="text-blue-300">⭐ XP: {step.xp}</p>

                {/* Curved Line Animation */}
                {index < careerRoadmaps[selectedCareer].length - 1 && (
                  <div className="w-16 h-16 border-t-4 border-r-4 border-gray-500 rounded-br-full absolute left-1/2 transform -translate-x-1/2 translate-y-6"></div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Back Button */}
          <button
            className="mt-8 px-6 py-3 bg-red-500 rounded hover:bg-red-700"
            onClick={() => setSelectedCareer(null)}
          >
            ← Back to Career Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningRoadmap;
