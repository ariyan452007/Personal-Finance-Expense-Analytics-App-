import React, { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { format, parseISO } from 'date-fns';
import './Analytics.css';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const Analytics = () => {
  const { transactions } = useTransactions();

  const analyticsData = useMemo(() => {
    // 1. Pie Chart Data (Expenses by Category)
    const categoryMap = {};
    
    // 2. Line Chart Data (Monthly Trend - last 6 months)
    const monthlyMap = {};
    
    // 3. Bar Chart Data (Income vs Expense)
    const incomeExpenseMap = { Income: 0, Expense: 0 };

    transactions.forEach(tx => {
      const amount = tx.amount;
      
      // Setup pie chart & general stats
      if (tx.type === 'expense') {
        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + amount;
        incomeExpenseMap.Expense += amount;
      } else {
        incomeExpenseMap.Income += amount;
      }

      // Setup line chart
      const monthYear = format(new Date(tx.date), 'MMM yyyy');
      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = { name: monthYear, income: 0, expense: 0 };
      }
      if (tx.type === 'income') {
        monthlyMap[monthYear].income += amount;
      } else {
        monthlyMap[monthYear].expense += amount;
      }
    });

    const pieData = Object.keys(categoryMap).map(key => ({
      name: key,
      value: categoryMap[key]
    })).sort((a, b) => b.value - a.value);

    // Sort monthly data chronologically by parsing the 'MMM yyyy' back to date
    const lineData = Object.values(monthlyMap).sort((a, b) => {
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA.getTime() - dateB.getTime();
    }).slice(-6); // last 6 months

    const barData = [
      { name: 'Income vs Expense', Income: incomeExpenseMap.Income, Expense: incomeExpenseMap.Expense }
    ];

    return { pieData, lineData, barData };
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-card" style={{ padding: '10px', border: '1px solid var(--border-color)' }}>
          <p className="label" style={{ margin: 0, fontWeight: 'bold' }}>{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: 0 }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Visualize your financial trends and breakdowns.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p>No data available to generate charts. Please add some transactions first.</p>
        </div>
      ) : (
        <div className="charts-grid">
          {/* Expenses Pie Chart */}
          <motion.div 
            className="chart-card glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Expenses by Category</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Income vs Expense Bar Chart */}
          <motion.div 
            className="chart-card glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Income vs Expenses</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Income" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Expense" fill="var(--danger)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Trend Line Chart */}
          <motion.div 
            className="chart-card glass-card full-width"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>6-Month Trend</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="income" name="Income" stroke="var(--secondary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expense" name="Expense" stroke="var(--danger)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
