import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const GetJobs = () => {
  const [careers, setCareers] = useState([]);
  const [careerTrends, setCareerTrends] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingGraph, setLoadingGraph] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_jobs")
      .then((response) => {
        console.log("Career Data:", response.data);
        setCareers(response.data.careers);
      })
      .catch((error) => console.error("Error fetching careers:", error))
      .finally(() => setLoadingJobs(false));

    axios.get("http://127.0.0.1:5000/predict_career_growth")
      .then((response) => {
        console.log("Career Growth Data:", response.data);
        setCareerTrends(
          Object.entries(response.data.career_growth).map(([name, growth]) => ({
            name,
            growth: parseFloat(growth.match(/-?\d+/)?.[0]) || 0, // ✅ Convert to number
          }))
        );
      })
      .catch((error) => console.error("Error fetching career trends:", error))
      .finally(() => setLoadingGraph(false));
  }, []);

  // 🔹 Filtered Career Trends Based on Search Query
  const filteredTrends = careerTrends.filter((trend) =>
    trend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 AI Career Market & Growth Predictor</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Career..."
          className="w-full p-3 text-lg bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

         {/* Career Growth Prediction */}
         <h2 className="text-2xl mt-6 mb-4">📈 Career Growth Predictions (2024-2030)</h2>
      {loadingGraph ? (
        <p className="text-lg text-gray-400">Loading graph...</p>
      ) : filteredTrends.length === 0 ? (
        <p className="text-lg text-red-400">No trend data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={filteredTrends}>
            <XAxis
              dataKey="name"
              tick={{ fill: "white", fontSize: 12, angle: -30 }}
              interval={0}
              height={100}
            />
            <YAxis tick={{ fill: "white", fontSize: 14 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="growth">
              {filteredTrends.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? "#00FF00" : "#FF3333"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Job Market Analysis */}
      <h2 className="text-2xl mb-4">📌 Job Market Analysis (20+ Careers)</h2>
      {loadingJobs ? (
        <p className="text-lg text-gray-400">Loading jobs...</p>
      ) : careers.length === 0 ? (
        <p className="text-lg text-red-400">No job data available.</p>
      ) : (
        <ul className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {careers.map((career, index) => (
            <li key={index} className="mb-4 p-3 border-b border-gray-600">
              <strong className="text-lg text-green-300">{career.career}</strong>: 
              <span className="text-yellow-300"> {career.job_count} jobs available.</span>
              <br />
              <span className="text-gray-400">Top Companies: {career.top_companies.join(", ")}</span>
            </li>
          ))}
        </ul>
      )}

   
    </div>
  );
};

export default GetJobs;
