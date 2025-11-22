import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import MedicalReports from "./pages/MedicalReports";
import HealthcareProviders from "./pages/HealthcareProviders";
import AccessRequests from "./pages/AccessRequests";
import SecurityAudit from "./pages/SecurityAudit";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { BlockchainProvider } from "./context/BlockchainContext";

import "./App.css";

// Component to protect routes
const ProtectedLayout = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/" />;
  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <BlockchainProvider>
        <Router>
          <div className={`app-layout ${darkMode ? "dark-mode" : ""}`}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/*"
                element={
                  <ProtectedLayout>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <div className="main-section">
                      <Sidebar />
                      <main className="page-content">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/medical-reports" element={<MedicalReports />} />
                          <Route path="/healthcare-providers" element={<HealthcareProviders />} />
                          <Route path="/access-requests" element={<AccessRequests />} />
                          <Route path="/security-audit" element={<SecurityAudit />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </main>
                    </div>
                    <Footer darkMode={darkMode} />
                  </ProtectedLayout>
                }
              />
            </Routes>
          </div>
        </Router>
      </BlockchainProvider>
    </AuthProvider>
  );
}

export default App;


