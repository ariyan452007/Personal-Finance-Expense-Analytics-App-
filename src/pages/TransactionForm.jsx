import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { CATEGORIES, TRANSACTION_TYPES } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required').typeError('Amount must be a number'),
  category: yup.string().required('Category is required'),
  type: yup.string().oneOf(TRANSACTION_TYPES).required('Type is required'),
  date: yup.string().required('Date is required'),
  notes: yup.string(),
  recurring: yup.boolean()
});

const TransactionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, addTransaction, updateTransaction } = useTransactions();
  
  const isEditing = !!id;
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: format(new Date(), 'yyyy-MM-dd'),
      recurring: false,
      notes: ''
    }
  });

  useEffect(() => {
    if (isEditing) {
      const txToEdit = transactions.find(t => t.id === id);
      if (txToEdit) {
        Object.keys(txToEdit).forEach(key => {
          if (key === 'date') {
            setValue(key, format(new Date(txToEdit[key]), 'yyyy-MM-dd'));
          } else {
            setValue(key, txToEdit[key]);
          }
        });
      } else {
        toast.error('Transaction not found');
        navigate('/transactions');
      }
    }
  }, [id, isEditing, transactions, setValue, navigate]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateTransaction({ ...data, id });
      toast.success('Transaction updated successfully');
    } else {
      const newTx = {
        ...data,
        id: uuidv4(),
        // store full ISO string to avoid timezone issues when parsing back
        date: new Date(data.date).toISOString() 
      };
      addTransaction(newTx);
      toast.success('Transaction added successfully');
    }
    navigate('/transactions');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/transactions" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ marginBottom: 0 }}>{isEditing ? 'Edit Transaction' : 'New Transaction'}</h1>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="input-field" {...register('type')}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.type && <span className="form-error">{errors.type.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="input-field" placeholder="E.g., Groceries" {...register('title')} />
            {errors.title && <span className="form-error">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input type="number" step="0.01" className="input-field" placeholder="0.00" {...register('amount')} />
            {errors.amount && <span className="form-error">{errors.amount.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="input-field" {...register('category')}>
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="input-field" {...register('date')} />
            {errors.date && <span className="form-error">{errors.date.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <textarea className="input-field" rows="3" {...register('notes')} />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="recurring" {...register('recurring')} />
            <label htmlFor="recurring" className="form-label" style={{ marginBottom: 0 }}>This is a recurring transaction</label>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/transactions')}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
