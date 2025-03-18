import React, { useState } from "react";
import axios from "axios";

const CareerForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    Gender: "",
    Age: "",
    GPA: "",
    Major: "",
    Interested_Domain: "",
    Projects: "",
    Internships: "",
    Certifications: "",
    Python: "",
    SQL: "",
    Java: "",
    Cplusplus: "",
    JavaScript: "",
    Cloud: "",
    AI: "",
    Cybersecurity: "",
    SoftSkills: "",
    WorkExperience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [careerPrediction, setCareerPrediction] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);

  const questions = [
    { label: "What is your Gender?", type: "select", name: "Gender", options: ["Male", "Female"], placeholder: "Select your gender" },
    { label: "How old are you?", type: "number", name: "Age", placeholder: "Enter your age" },
    { label: "What is your GPA?", type: "number", name: "GPA", step: "0.1", placeholder: "Enter your GPA" },
    { label: "What is your Major?", type: "text", name: "Major", placeholder: "Enter your major" },
    { label: "What is your Interested Domain?", type: "text", name: "Interested_Domain", placeholder: "Enter your interested domain" },
    { label: "How many Projects have you completed?", type: "number", name: "Projects", placeholder: "Enter number of projects" },
    { label: "How many Internships have you done?", type: "number", name: "Internships", placeholder: "Enter number of internships" },
    { label: "What Certifications do you have?", type: "text", name: "Certifications", placeholder: "Enter your certifications" },
    { label: "How skilled are you in Python (1-10)?", type: "number", name: "Python", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in SQL (1-10)?", type: "number", name: "SQL", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in Java (1-10)?", type: "number", name: "Java", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in C++ (1-10)?", type: "number", name: "Cplusplus", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in JavaScript (1-10)?", type: "number", name: "JavaScript", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in Cloud Computing (1-10)?", type: "number", name: "Cloud", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in AI (1-10)?", type: "number", name: "AI", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How skilled are you in Cybersecurity (1-10)?", type: "number", name: "Cybersecurity", min: 1, max: 10, placeholder: "Enter skill level (1-10)" },
    { label: "How strong are your Soft Skills?", type: "text", name: "SoftSkills", placeholder: "Enter your soft skills" },
    { label: "How many years of Work Experience do you have?", type: "number", name: "WorkExperience", placeholder: "Enter years of experience" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setCareerPrediction("");
    setShowPrediction(false);

    try {
      console.log("🚀 Sending Data:", formData);
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Response from Flask:", response.data);

      if (response.data.career_prediction) {
        setCareerPrediction(response.data.career_prediction);
        setShowPrediction(true);
      } else {
        setError("Prediction failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Error fetching prediction:", error);
      setError("Server Error: Unable to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  if (showPrediction) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700 p-6">
        <div className="max-w-3xl w-full bg-white p-12 rounded-lg shadow-xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Your Career Prediction 🎯</h2>
          <p className="text-2xl text-gray-700 font-semibold bg-green-100 p-4 rounded-lg">
            🚀 **{careerPrediction}**
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg font-bold hover:bg-blue-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0f1f] p-6">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Career Prediction Quiz 🎯
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{questions[currentQuestion].label}</label>
          <input
            type={questions[currentQuestion].type}
            name={questions[currentQuestion].name}
            value={formData[questions[currentQuestion].name]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            placeholder={questions[currentQuestion].placeholder}
          />
          <button
            onClick={currentQuestion === questions.length - 1 ? handleSubmit : handleNext}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            {currentQuestion === questions.length - 1 ? (loading ? "Predicting..." : "Predict Career") : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
