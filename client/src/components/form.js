import React, { useState } from "react";
import axios from "axios";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    Gender: "",
    Age: "",
    GPA: "",
    Major: "",
    Interested_Domain: "",
    Python: "",
    SQL: "",
    Java: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [careerPrediction, setCareerPrediction] = useState("");

  // ✅ **Options for Dropdowns**
  const majorOptions = [
    "Computer Science",
  ];

  const interestOptions = [
    "Artificial Intelligence",
    "Data Science",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Machine Learning",
    "Database Management",
    "Cloud Computing",
    "Mobile App Development",
    "Computer Graphics",
    "Quantum Computing",
    "Blockchain Technology",
    "Bioinformatics",
    "Human-Computer Interaction",
    "Geographic Information Systems",
    "Game Development",
    "IoT (Internet of Things)",
    "Natural Language Processing",
    "Network Security",
    "Embedded Systems",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCareerPrediction("");

    try {
      console.log("🚀 Sending Data:", formData);
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("✅ Response from Flask:", response.data);

      if (response.data.career_prediction) {
        setCareerPrediction(response.data.career_prediction);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">
          Career Prediction Form 🎯
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Gender Selection */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Gender:</label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Age Input */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Age:</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg"
            />
          </div>

          {/* GPA Input */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">GPA:</label>
            <input
              type="number"
              step="0.1"
              name="GPA"
              value={formData.GPA}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg"
            />
          </div>

          {/* Major Selection */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Major:</label>
            <select
              name="Major"
              value={formData.Major}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg"
            >
              <option value="">Select</option>
              {majorOptions.map((major, index) => (
                <option key={index} value={major}>{major}</option>
              ))}
            </select>
          </div>

          {/* Interested Domain Selection */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Interested Domain:</label>
            <select
              name="Interested_Domain"
              value={formData.Interested_Domain}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg"
            >
              <option value="">Select</option>
              {interestOptions.map((interest, index) => (
                <option key={index} value={interest}>{interest}</option>
              ))}
            </select>
          </div>

          {/* Skill Ratings */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Python (1-10):</label>
              <input
                type="number"
                name="Python"
                value={formData.Python}
                onChange={handleChange}
                required
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">SQL (1-10):</label>
              <input
                type="number"
                name="SQL"
                value={formData.SQL}
                onChange={handleChange}
                required
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Java (1-10):</label>
              <input
                type="number"
                name="Java"
                value={formData.Java}
                onChange={handleChange}
                required
                className="border p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Career"}
          </button>
        </form>

        {/* Prediction Result Display */}
        {careerPrediction && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 font-medium text-center rounded-lg">
            🎯 Predicted Career: {careerPrediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerForm;





import React, { useState } from "react";
import axios from "axios";

const CareerForm = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setCareerPrediction("");

  try {
    console.log("🚀 Sending Data:", formData);  // Debugging

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      formData,  // Sending form data
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Response from Flask:", response.data); // Debugging

    if (response.data.career_prediction) {
      setCareerPrediction(response.data.career_prediction);
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


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Career Prediction Form 🎯
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-600 font-medium">
                {field.replace(/_/g, " ")}:
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Career"}
          </button>
        </form>

        {careerPrediction && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 font-bold text-center rounded-lg">
            🎯 Predicted Career: {careerPrediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerForm;
