import React, { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency, formatDate } from '../utils/formatters';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const StatCard = ({ title, amount, icon: Icon, type, delay }) => (
  <motion.div 
    className="stat-card glass-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="stat-header">
      <span className="stat-title">{title}</span>
      <div className={`stat-icon-wrapper ${type}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="stat-amount">{formatCurrency(amount)}</div>
  </motion.div>
);

const Dashboard = () => {
  const { transactions } = useTransactions();

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};

    transactions.forEach(tx => {
      if (tx.type === 'income') {
        income += tx.amount;
      } else {
        expense += tx.amount;
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
      }
    });

    let topCategory = 'None';
    let maxExpense = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > maxExpense) {
        maxExpense = amt;
        topCategory = cat;
      }
    }

    return {
      income,
      expense,
      balance: income - expense,
      topCategory
    };
  }, [transactions]);

  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your financial overview.</p>
        </div>
      </motion.div>

      <div className="stats-grid">
        <StatCard title="Total Balance" amount={stats.balance} icon={DollarSign} type="neutral" delay={0.1} />
        <StatCard title="Total Income" amount={stats.income} icon={ArrowUpRight} type="income" delay={0.2} />
        <StatCard title="Total Expenses" amount={stats.expense} icon={ArrowDownRight} type="expense" delay={0.3} />
        <motion.div 
          className="stat-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-header">
            <span className="stat-title">Top Expense Category</span>
            <div className="stat-icon-wrapper neutral">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-amount text-md" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
            {stats.topCategory}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="recent-transactions glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="section-header">
          <h2>Recent Transactions</h2>
        </div>
        {recentTransactions.length === 0 ? (
          <div className="empty-state">No transactions yet. Start adding some!</div>
        ) : (
          <div className="transaction-list">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="transaction-item">
                <div className="tx-info">
                  <div className="tx-icon">
                    {tx.type === 'income' ? <ArrowUpRight color="var(--secondary)" /> : <ArrowDownRight color="var(--danger)" />}
                  </div>
                  <div>
                    <div className="tx-title">{tx.title}</div>
                    <div className="tx-category">{tx.category} • {formatDate(tx.date)}</div>
                  </div>
                </div>
                <div className={`tx-amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
