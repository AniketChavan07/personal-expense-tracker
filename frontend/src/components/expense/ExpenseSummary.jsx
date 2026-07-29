import React, { useMemo } from 'react';
import { TrendingDown, TrendingUp, IndianRupee, Activity, Maximize2, Minimize2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const ExpenseSummary = ({ expenses }) => {
  const stats = useMemo(() => {
    if (!expenses.length) {
      return { total: 0, count: 0, thisMonth: 0, highest: 0, lowest: 0 };
    }

    let total = 0;
    let highest = expenses[0].amount;
    let lowest = expenses[0].amount;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let thisMonth = 0;

    expenses.forEach(exp => {
      total += exp.amount;
      if (exp.amount > highest) highest = exp.amount;
      if (exp.amount < lowest) lowest = exp.amount;

      const date = new Date(exp.date);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        thisMonth += exp.amount;
      }
    });

    return { total, count: expenses.length, thisMonth, highest, lowest };
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* Total Expenses */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
            <IndianRupee className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.total)}</h3>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Transactions</p>
          <h3 className="text-2xl font-bold text-slate-900">{stats.count}</h3>
        </div>
      </div>

      {/* This Month */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">This Month</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.thisMonth)}</h3>
        </div>
      </div>

      {/* Highest */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
            <Maximize2 className="h-5 w-5 text-rose-600" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Highest</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.highest)}</h3>
        </div>
      </div>

      {/* Lowest */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
            <Minimize2 className="h-5 w-5 text-teal-600" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Lowest</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(stats.lowest)}</h3>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
