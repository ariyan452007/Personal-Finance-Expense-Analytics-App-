import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { useDebounce } from '../hooks/useDebounce';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CATEGORIES } from '../utils/constants';
import { Plus, Search, Filter, Edit2, Trash2, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import './Transactions.css';

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted');
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    // Search
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(lowerSearch) || 
        (t.notes && t.notes.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter Type
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Filter Category
    if (filterCategory !== 'all') {
      result = result.filter(t => t.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [transactions, debouncedSearch, filterType, filterCategory, sortBy]);

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Transactions</h1>
        <Link to="/transactions/new" className="btn btn-primary">
          <Plus size={20} /> Add New
        </Link>
      </div>

      <div className="filters-card glass-card">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="input-field"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select className="input-field" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="input-field" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      <div className="transactions-list glass-card">
        {filteredAndSorted.length === 0 ? (
          <div className="empty-state">No transactions found matching your criteria.</div>
        ) : (
          <table className="tx-table">
            <thead>
              <tr>
                <th>Title & Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((tx, index) => (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td>
                    <div className="tx-title-cell">
                      <span className="tx-title">{tx.title}</span>
                      {tx.recurring && <Repeat size={14} color="var(--primary)" />}
                    </div>
                    <div className="tx-category">{tx.category}</div>
                  </td>
                  <td>{formatDate(tx.date)}</td>
                  <td className={`tx-amount ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/transactions/edit/${tx.id}`} className="btn btn-ghost action-btn">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(tx.id)} className="btn btn-ghost action-btn danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transactions;
