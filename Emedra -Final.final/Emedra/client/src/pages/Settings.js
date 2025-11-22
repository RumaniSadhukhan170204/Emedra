import React, { useState } from "react";
import "../styles/Settings.css";
import { User, Bell, Shield, Database } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="content">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2>Settings</h2>
          <p>Manage your account, preferences, and security</p>
        </div>
      </header>

      <div className="settings-container">
        {/* Sidebar Tabs */}
        <aside className="settings-sidebar">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} /> Profile
          </button>
          <button
            className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={20} /> Notifications
          </button>
          <button
            className={`tab-btn ${activeTab === "privacy" ? "active" : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            <Shield size={20} /> Privacy & Security
          </button>
          <button
            className={`tab-btn ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            <Database size={20} /> Data Management
          </button>
        </aside>

        {/* Main Content */}
        <section className="settings-content">
          {activeTab === "profile" && (
            <div className="card">
              <h3>Profile Information</h3>
              <form className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter first name" defaultValue="Kanchan" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter last name" defaultValue="Mahajan" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter email" defaultValue="mk@gmail.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" placeholder="Enter phone number" />
                </div>
                <div className="form-group full-width">
                  <label>Bio</label>
                  <textarea placeholder="Tell us about yourself..."></textarea>
                </div>
                <button className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card">
              <h3>Notifications</h3>
              <p>Configure email & system alerts here.</p>
              <button className="upload-btn">Manage Notifications</button>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="card">
              <h3>Privacy & Security</h3>
              <p>Manage your login, password, and 2FA options here.</p>
              <button className="upload-btn">Change Password</button>
            </div>
          )}

          {activeTab === "data" && (
            <div className="card">
              <h3>Data Management</h3>
              <p>Export or delete your account data securely.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Settings;

