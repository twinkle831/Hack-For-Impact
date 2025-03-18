import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CrimeHotspotPage from "./components/CrimeHotspotPage";
import RaiseComplaint from "./components/RaiseComplaint";
// import AIVideoConsultation from "./components/AIVideoConsultation";
// import CareerForm from "./components/CareerForm";
// import GetJobs from "./components/GetJobs";
// import CareerPath from "./components/CareerPath";
// import CareerMentor from "./components/CareerMentor";
// import LearningRoadmap from "./components/LearningRoadmap";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/heatmap" element={<CrimeHotspotPage />} />
        <Route path="/ai" element={<RaiseComplaint />} />
        {/* <Route path="/jobs" element={<GetJobs />} />
        <Route path="/careerpath" element={<CareerPath />} />
        <Route path="/careermentor" element={<CareerMentor />} />
        <Route path="/learning" element={<LearningRoadmap />} /> */}
      </Routes>
    </Router>
  );
}

export default App;