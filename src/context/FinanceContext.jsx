import React, { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

const LOCAL_STORAGE_KEY_TX = 'finance_transactions';
const LOCAL_STORAGE_KEY_BUDGET = 'finance_budget';

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TX);
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BUDGET);
    return saved ? JSON.parse(saved) : { monthlyBudget: 5000 };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TX, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_BUDGET, JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (tx) => setTransactions(prev => [...prev, tx]);
  const updateTransaction = (tx) => setTransactions(prev => prev.map(t => t.id === tx.id ? tx : t));
  const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
  const updateBudget = (b) => setBudget(b);

  return (
    <FinanceContext.Provider value={{
      transactions, addTransaction, updateTransaction, deleteTransaction,
      budget, updateBudget
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
