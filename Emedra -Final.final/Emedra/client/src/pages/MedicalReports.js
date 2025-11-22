import React, { useState, useRef } from "react";
import { storeOnBlockchain, getReports } from "../services/blockchainService";

const MedicalReports = () => {
  const [hash, setHash] = useState("");
  const [allReports, setAllReports] = useState([]);
  const fileInputRef = useRef(null);

  // Store report hash on blockchain
  const handleStore = async () => {
    try {
      const txHash = await storeOnBlockchain(hash);
      alert(`✅ Stored on blockchain!\nTxHash: ${txHash}`);
      setHash(""); 
    } catch (err) {
      console.error("❌ Error storing report:", err);
      alert("Failed to store report. Check console for details.");
    }
  };

  // Fetch reports (PDF list) from backend
  const handleFetch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports");

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("❌ Server did not return JSON. Response: " + text);
      }

      const reports = await res.json();
      setAllReports(reports);
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
      alert("Failed to fetch reports. " + err.message);
    }
  };

  // Upload PDF
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("❌ Only PDF files are allowed!");
      return;
    }

    console.log("📂 Selected PDF:", file.name);

    const formData = new FormData();
    formData.append("report", file);

    try {
      const res = await fetch("http://localhost:5000/api/reports/upload", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("❌ Upload failed. Server response: " + text);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      alert("✅ PDF uploaded successfully!");
      handleFetch(); 
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  return (
    <main className="content">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2>Medical Reports</h2>
          <p>View, upload, and manage your health records securely.</p>
        </div>
        <div className="header-actions">
          <button onClick={handleFetch}>Get Reports</button>
          <button
            className="upload-btn"
            onClick={() => fileInputRef.current.click()}
          >
            Upload PDF
          </button>
        </div>
      </header>

      {/* Hidden PDF File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".pdf"
        onChange={handleFileChange}
      />

      {/* Blockchain Input Section */}
      <section className="blockchain-section">
        <h3>Store Report on Blockchain</h3>
        <input
          type="text"
          placeholder="Enter report hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <button onClick={handleStore}>Store Report</button>
      </section>

      {/* Reports List */}
      <section className="medical-reports">
        <h3>Fetched Reports</h3>
        {allReports.length === 0 ? (
          <p>No medical reports uploaded yet.</p>
        ) : (
          <ul>
            {allReports.map((r, i) => (
              <li key={i}>
                <a
                  href={`http://localhost:5000/uploads/${r.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.originalname || `Report ${i + 1}`}
                </a>
              </li>
            ))}
          </ul>
        )}

        <button
          className="upload-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Another PDF
        </button>
      </section>
    </main>
  );
};

export default MedicalReports;




   