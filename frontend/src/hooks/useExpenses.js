import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.sort) params.append('sort', filters.sort);

      const response = await api.get(`/expenses?${params.toString()}`);
      setExpenses(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (expenseData) => {
    try {
      setError(null);
      const response = await api.post('/expenses', expenseData);
      setExpenses((prev) => [response.data, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteExpense = async (id) => {
    try {
      setError(null);
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { expenses, loading, error, fetchExpenses, addExpense, deleteExpense };
};
