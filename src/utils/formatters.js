import { format } from 'date-fns';

export const formatCurrency = (amount, currencyCode = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM dd, yyyy');
};
