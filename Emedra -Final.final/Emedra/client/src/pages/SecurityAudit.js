import React from "react";
import "../styles/SecurityAudit.css";
import { ShieldCheck, Database, Activity, AlertTriangle } from "lucide-react";

const SecurityAudit = () => {
  return (
    <main className="content">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2>Security Audit</h2>
          <p>Monitor system activity and blockchain verification</p>
        </div>
      </header>

      {/* Stats */}
      <section className="stats-grid">
        <div className="stat-card">
          <ShieldCheck size={36} className="stat-icon secure" />
          <div>
            <h3>Security Score</h3>
            <p>98%</p>
          </div>
        </div>

        <div className="stat-card">
          <Database size={36} className="stat-icon records" />
          <div>
            <h3>Blockchain Records</h3>
            <p>0</p>
          </div>
        </div>

        <div className="stat-card">
          <Activity size={36} className="stat-icon activity" />
          <div>
            <h3>Daily Activities</h3>
            <p>0</p>
          </div>
        </div>

        <div className="stat-card">
          <AlertTriangle size={36} className="stat-icon alerts" />
          <div>
            <h3>Security Alerts</h3>
            <p>0</p>
          </div>
        </div>
      </section>

      {/* Blockchain Status */}
      <section className="network-status">
        <h3>Blockchain Network Status</h3>
        <div className="status-grid">
          <div className="status-card">
            <span className="dot green"></span>
            <p>
              <strong>Network Status</strong>
              <br />Connected & Synced
            </p>
          </div>
          <div className="status-card">
            <span className="dot blue"></span>
            <p>
              <strong>IPFS Gateway</strong>
              <br />Operational
            </p>
          </div>
          <div className="status-card">
            <span className="dot purple"></span>
            <p>
              <strong>Smart Contracts</strong>
              <br />4/4 Active
            </p>
          </div>
        </div>
      </section>

      {/* Audit Trail */}
      <section className="audit-logs">
        <h3>Audit Trail</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Status</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="empty">
                No activity logs available yet.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default SecurityAudit;

