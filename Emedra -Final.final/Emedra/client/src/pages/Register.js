import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("✅ Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Left Info Section */}
      <div className="register-left">
        <div className="logo">
          <span className="logo-icon">⚕</span>
          <h1>E-Medra</h1>
        </div>
        <p className="tagline">Health Belongs to You. We Keep it That Way.</p>

        <h2>
          Join the Future of <span>Healthcare</span>
        </h2>
        <p className="description">
          Create your secure account and take control of your medical records
          with blockchain-powered protection.
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

      {/* Right Register Card */}
      <div className="register-right">
        <div className="register-card">
          <h2>Create Account</h2>
          <p className="subtitle">Join E-Medra&apos;s secure healthcare platform</p>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />

            <label>Account Type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="hospital">Hospital</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="register-links">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

