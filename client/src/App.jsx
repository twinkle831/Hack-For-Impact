import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import getWeb3 from "./utils/web3";
import { getContract } from "./utils/contractUtils";
import IncidentForm from "./components/IncidentForm";
import IncidentViewer from "./components/IncidentViewer";
import LandingPage from "./components/LandingPage";
import CrimeHotspotPage from "./components/CrimeHotspotPage";
import RaiseComplaint from "./components/RaiseComplaint";
import ContactUs from "./components/Contactus";
import Dashboard from "./components/Dashboard";
import LocationDecoder from "./components/LocationDecoder";
import LegalAdvisorAvatar from "./components/AvatarDemo";
import FitbitIntegration from "./components/WearableDevice";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminAddress, setAdminAddress] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);

        const { instance } = await getContract(web3Instance);
        setContract(instance);

        const admin = await instance.methods.admin().call();
        setAdminAddress(admin);
      } catch (error) {
        console.error("Failed to load web3, accounts, or contract:", error);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          <p className="account-info">
            Connected Account: {accounts[0]}
            {accounts[0] === adminAddress && <span className="admin-badge">Admin</span>}
          </p>
        </header> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/heatmap" element={<CrimeHotspotPage />} />
          <Route path="/complaint" element={<RaiseComplaint />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai" element={<LocationDecoder />} />
          <Route path="/legal-assistance" element={<LegalAdvisorAvatar />} />
          <Route path="/wearable" element={<FitbitIntegration />} />

          <Route
            path="/complain"
            element={
              <div className="container">
                <IncidentForm contract={contract} accounts={accounts} />
                <IncidentViewer contract={contract} />
              </div>
            }
          />
        </Routes>

        {accounts[0] === adminAddress && (
          <div className="admin-panel">
            <h2>Admin Panel</h2>
            <p>Additional administrative features can be added here</p>
          </div>
        )}

        {/* <footer>
          <p>System Admin: {adminAddress}</p>
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
