import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useBudget = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }
  return {
    budget: context.budget,
    updateBudget: context.updateBudget,
  };
};
