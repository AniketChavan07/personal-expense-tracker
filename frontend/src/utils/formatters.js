import moment from 'moment';

export const formatCurrency = (amount) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  
  return `₹${formattedAmount}`;
};

export const formatDate = (dateString) => {
  return moment(dateString).format('MMM D, YYYY');
};
