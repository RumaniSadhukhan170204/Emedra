import React, { useState } from "react";
// 🐛 Fix: Corrected the relative path for the CSS file
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  // ✅ Fix: Correctly use the custom hook
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 👉 Google Provider
  const googleProvider = new GoogleAuthProvider();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Email/Password login (via context API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password); 
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google user:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Google login error:", err.message);
      setError("Google login failed. Try again!");
    }
  };

  return (
    <div className="login-page">
      {/* Left Info Section */}
      <div className="login-left">
        <div className="logo">
          <span className="logo-icon">⚕</span>
          <h1>E-Medra</h1>
        </div>
        <p className="tagline">Health Belongs to You. We Keep it That Way.</p>

        <h2>
          Secure Healthcare <span>Blockchain Platform</span>
        </h2>
        <p className="description">
          Manage your medical records with blockchain-powered security,
          patient-controlled access, and tamper-proof storage.
        </p>

        <div className="features">
          <div className="feature-box">
            <span>🛡</span>
            <p>
              <strong>Secure</strong>
              <br /> Blockchain Protection
            </p>
          </div>
          <div className="feature-box">
            <span>🔒</span>
            <p>
              <strong>Private</strong>
              <br /> End-to-End Encrypted
            </p>
          </div>
          <div className="feature-box">
            <span>👤</span>
            <p>
              <strong>Controlled</strong>
              <br /> Patient-Owned Access
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to access your secure health records</p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* 🔹 Google Sign In Button */}
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            Sign In with Google
          </button>

          <div className="login-links">
            <p>
              Don’t have an account? <Link to="/register">Create Account</Link>
            </p>
          </div>

          <div className="login-footer">
            <strong>Blockchain Connected</strong>
            <p>
              Your login is secured by blockchain technology for maximum
              protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;







