// src/pages/Dashboard.js
import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    Age: "",
    Sex: "",
    ChestPain: "",
    BP: "",
    Cholesterol: "",
    FBS: "",
    EKG: "",
    MaxHR: "",
    ExerciseAngina: "",
    ST_Depression: "",
    Slope: "",
    Vessels: "",
    Thallium: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("report", file);

    try {
      const res = await fetch("http://localhost:5000/api/reports/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      alert("✅ Report uploaded successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Fixed version: Convert string inputs → numbers + validate
  const handlePredict = async () => {
    try {
      setLoading(true);

      // Validation for empty fields
      for (let key in formData) {
        if (formData[key] === "") {
          alert(`⚠️ Please fill in the field: ${key}`);
          setLoading(false);
          return;
        }
      }

      // Convert all input values to numbers
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, Number(value)])
      );

      const res = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numericData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Prediction failed on server.");

      setResult({
        status: data.severity,
        message: data.alert,
      });
    } catch (err) {
      setResult({
        status: "❌ Error",
        message: err.message || "ML server not responding or network error.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard">
        <Sidebar />

        <main className="content">
          <header className="dashboard-header">
            <div>
              <h2>My Health Records</h2>
              <p>Manage your medical reports and view ML-based predictions</p>
            </div>
            <div className="header-actions">
              <button className="export-btn">Export Records</button>
              <button
                className="upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Upload Record
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".pdf,.jpg,.png,.docx"
            onChange={handleFileChange}
          />

          <section className="stats">
            <div className="stat-card stat-encrypted">
              <h4 className="blue">ENCRYPTED</h4>
              <p>0 Medical Records</p>
              <small>No reports yet</small>
            </div>
            <div className="stat-card stat-pending">
              <h4 className="yellow">PENDING</h4>
              <p>0 Pending Approvals</p>
              <small>All up to date</small>
            </div>
            <div className="stat-card stat-verified">
              <h4 className="green">VERIFIED</h4>
              <p>0 Active Permissions</p>
              <small>Healthcare providers</small>
            </div>
            <div className="stat-card stat-blockchain">
              <h4 className="purple">PROTECTED</h4>
              <p>100% Blockchain Secured</p>
              <small>All records encrypted</small>
            </div>
          </section>

          {/* ML SECTION */}
          <section className="ml-section" style={{ marginTop: "40px" }}>
            <h3>❤️ Heart Disease Severity Predictor</h3>
            <p>Enter patient details to analyze severity using ML model.</p>

            <div
              className="ml-form"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {Object.keys(formData).map((key) => (
                <div
                  key={key}
                  className="ml-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "600",
                      width: "250px",
                      textAlign: "right",
                    }}
                  >
                    {key}:
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key}`}
                    style={{
                      flex: "1",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              className="upload-btn"
              onClick={handlePredict}
              disabled={loading}
              style={{ marginTop: "20px" }}
            >
              {loading ? "Analyzing..." : "Check Severity"}
            </button>

            {result && (
              <div
                className="ml-result"
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "10px",
                  backgroundColor:
                    result.status === "Critical"
                      ? "#ffdddd"
                      : result.status === "Normal"
                      ? "#ddffdd"
                      : "#ffe6cc",
                  border:
                    result.status === "Critical"
                      ? "2px solid red"
                      : result.status === "Normal"
                      ? "2px solid green"
                      : "2px solid orange",
                }}
              >
                <h4>{result.status}</h4>
                <p>{result.message}</p>
              </div>
            )}
          </section>
        </main>

        <aside className="right-sidebar">
          <div className="card">
            <h4>Health Insights</h4>
            <p>❤️ Latest Checkup: All vitals normal</p>
            <p>🔒 Privacy Score: 100% - Fully encrypted</p>
            <p>✅ Connected & Synced</p>
          </div>

          <div className="card">
            <h4>Blockchain Status</h4>
            <p>
              <strong>Wallet Address:</strong> 0xf376...9479
            </p>
            <p>
              <strong>Network:</strong> Ethereum Mainnet
            </p>
            <p>
              <strong>Gas:</strong> 0.0234 ETH
            </p>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
