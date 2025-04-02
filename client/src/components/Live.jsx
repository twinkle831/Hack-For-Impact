import React, { useState, useEffect } from "react";
import axios from "axios";

function Live() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [livePrediction, setLivePrediction] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading file", error);
      setError("Failed to analyze video. Please try again.");
    }
    setLoading(false);
  };

  const startLivePrediction = async () => {
    setIsLive(true);
    setError(null);
    setLivePrediction(null);

    try {
      await axios.get("http://127.0.0.1:5000/start_live");
      pollLivePrediction();
    } catch (error) {
      console.error("Error starting live prediction", error);
      setError("Failed to start live analysis.");
    }
  };

  const pollLivePrediction = () => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/live_predict");
        setLivePrediction(response.data);
      } catch (error) {
        console.error("Error fetching live prediction", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  const stopLivePrediction = () => {
    setIsLive(false);
    setLivePrediction(null);
  };

  return (
    <div className="bg-[#0B1727] min-h-screen text-white">
      <header className="bg-[#0B1727] text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Crime Detect</h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Dashboard</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </nav>
      </header>

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center">Crime Detection</h2>
        <div className="flex flex-col items-center mt-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mb-4 text-black"
            disabled={loading || isLive}
          />
          <button
            onClick={handleUpload}
            className={`px-4 py-2 rounded-md text-white mb-4 ${
              loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading || isLive}
          >
            {loading ? "Processing..." : "Upload & Analyze"}
          </button>
          <button
            onClick={isLive ? stopLivePrediction : startLivePrediction}
            className={`px-4 py-2 rounded-md text-white ${
              isLive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLive ? "Stop Live Analysis" : "Start Live Analysis"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-600 text-white rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        {prediction && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Prediction Result</h3>
            <p className="text-lg">
              Predicted Class: {prediction.predicted_class}
            </p>
            <p className="text-sm text-gray-400">
              Inference Time: {prediction.inference_time.toFixed(2)}s
            </p>
          </div>
        )}

        {livePrediction && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Live Prediction Result</h3>
            <p className="text-lg">
              Predicted Class: {livePrediction.predicted_class}
            </p>
            <p className="text-sm text-gray-400">
              Inference Time: {livePrediction.inference_time.toFixed(2)}s
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Live;
