import React, { useState } from 'react';
import ExpenseList from '../components/expense/ExpenseList';
import Toast from '../components/ui/Toast';
import { useExpenses } from '../hooks/useExpenses';
import { Search, Filter, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Housing & Utilities',
  'Shopping',
  'Entertainment',
  'Health & Wellness',
  'Others'
];

const ExpenseListPage = () => {
  const { expenses, loading, deleteExpense, fetchExpenses } = useExpenses();
  const [toast, setToast] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'date_desc'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchExpenses(newFilters);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Expenses</h1>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search expenses..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full sm:w-48 pl-9 pr-8 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:flex-none">
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="w-full sm:w-40 pl-4 pr-8 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <ExpenseList
        expenses={expenses}
        loading={loading}
        onDeleteExpense={deleteExpense}
        setToast={setToast}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ExpenseListPage;
