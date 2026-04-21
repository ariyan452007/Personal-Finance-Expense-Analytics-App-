import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Wallet } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/analytics', label: 'Analytics', icon: PieChart },
];

export const Sidebar = () => {
  return (
    <aside className="sidebar glass-card">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Wallet size={24} color="#6366f1" />
        </div>
        <h2 className="logo-text">FinTrack</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <p className="user-name">User Account</p>
            <p className="user-email">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
