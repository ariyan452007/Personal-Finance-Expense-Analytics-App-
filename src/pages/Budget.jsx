import React, { useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/formatters';
import { motion } from 'framer-motion';
import { Edit2, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import './Budget.css';

const Budget = () => {
  const { budget, updateBudget } = useBudget();
  const { transactions } = useTransactions();
  
  const [isEditing, setIsEditing] = useState(false);
  const [newBudgetValue, setNewBudgetValue] = useState(budget.monthlyBudget);

  const currentMonthExpenses = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(tx => tx.type === 'expense')
      .filter(tx => {
        const txDate = new Date(tx.date);
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
      })
      .reduce((acc, tx) => acc + tx.amount, 0);
  }, [transactions]);

  const handleSaveBudget = () => {
    const value = parseFloat(newBudgetValue);
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid positive number');
      return;
    }
    updateBudget({ monthlyBudget: value });
    setIsEditing(false);
    toast.success('Budget updated successfully');
  };

  const percentageUsed = Math.min((currentMonthExpenses / budget.monthlyBudget) * 100, 100);
  const isWarning = percentageUsed > 80;
  const isDanger = percentageUsed >= 100;

  return (
    <div className="budget-page">
      <div className="page-header">
        <h1>Monthly Budget</h1>
        <p>Track your spending against your budget goals.</p>
      </div>

      <motion.div 
        className="budget-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="budget-header">
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Total Monthly Budget</h2>
            {isEditing ? (
              <div className="budget-edit-input">
                <span className="currency-symbol">$</span>
                <input 
                  type="number" 
                  value={newBudgetValue} 
                  onChange={(e) => setNewBudgetValue(e.target.value)}
                  className="input-field"
                  autoFocus
                />
              </div>
            ) : (
              <div className="budget-amount">{formatCurrency(budget.monthlyBudget)}</div>
            )}
          </div>
          <div>
            {isEditing ? (
              <button onClick={handleSaveBudget} className="btn btn-primary">
                <Save size={18} /> Save
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn btn-ghost">
                <Edit2 size={18} /> Edit Limit
              </button>
            )}
          </div>
        </div>

        <div className="budget-progress-container">
          <div className="budget-stats">
            <div className="stat">
              <span className="label">Spent this month</span>
              <span className="value">{formatCurrency(currentMonthExpenses)}</span>
            </div>
            <div className="stat text-right">
              <span className="label">Remaining</span>
              <span className="value">{formatCurrency(Math.max(budget.monthlyBudget - currentMonthExpenses, 0))}</span>
            </div>
          </div>
          
          <div className="progress-bar-bg">
            <motion.div 
              className={`progress-bar-fill ${isDanger ? 'danger' : isWarning ? 'warning' : 'safe'}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentageUsed}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="progress-text">
            {percentageUsed.toFixed(1)}% of your monthly budget used
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Budget;
