import React from "react";
import "../styles/HealthcareProviders.css";
import { Users, ShieldCheck, Building2, UserPlus } from "lucide-react";

const HealthcareProviders = () => {
  return (
    <main className="content">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2>Healthcare Providers</h2>
          <p>Manage and connect with doctors, hospitals, and clinics</p>
        </div>
        <div className="header-actions">
          <button className="invite-btn">
            <UserPlus size={18} /> Invite User
          </button>
          <button className="upload-btn">Add Provider</button>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="filters">
        <input type="text" placeholder="Search by name, email, or ID" />
        <select>
          <option>All Roles</option>
          <option>Doctor</option>
          <option>Hospital</option>
          <option>Clinic</option>
        </select>
        <select>
          <option>All Status</option>
          <option>Verified</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Stats Boxes */}
      <section className="stats-grid">
        <div className="stat-card">
          <Users size={32} className="stat-icon" />
          <div>
            <h3>Total Users</h3>
            <p>0</p>
          </div>
        </div>

        <div className="stat-card">
          <ShieldCheck size={32} className="stat-icon verified" />
          <div>
            <h3>Verified</h3>
            <p>0</p>
          </div>
        </div>

        <div className="stat-card">
          <Building2 size={32} className="stat-icon hospital" />
          <div>
            <h3>Hospitals</h3>
            <p>0</p>
          </div>
        </div>

        <div className="stat-card">
          <UserPlus size={32} className="stat-icon new-users" />
          <div>
            <h3>New This Month</h3>
            <p>0</p>
          </div>
        </div>
      </section>

      {/* Providers List Section */}
      <section className="list-section">
        <p>No providers connected yet.</p>
      </section>
    </main>
  );
};

export default HealthcareProviders;

