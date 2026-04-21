import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import { ToastContainer } from 'react-toastify';
import { Sidebar } from './components/layout/Sidebar';
import 'react-toastify/dist/ReactToastify.css';

// We will create these pages next
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import TransactionForm from './pages/TransactionForm';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';

function App() {
  return (
    <FinanceProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/new" element={<TransactionForm />} />
              <Route path="/transactions/edit/:id" element={<TransactionForm />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
        <ToastContainer theme="dark" position="bottom-right" />
      </Router>
    </FinanceProvider>
  );
}

export default App;
