import React, { useState, useMemo } from 'react';
import ExpenseSummary from '../components/expense/ExpenseSummary';
import ExpenseForm from '../components/expense/ExpenseForm';
import Toast from '../components/ui/Toast';
import { useExpenses } from '../hooks/useExpenses';
import { PlusCircle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import moment from 'moment';
import { formatCurrency } from '../utils/formatters';

const COLORS = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

const Dashboard = () => {
  const { expenses, loading, addExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Process data for Line Chart (Monthly Trend)
  const monthlyData = useMemo(() => {
    const dataMap = {};
    expenses.forEach(exp => {
      const monthYear = moment(exp.date).format('MMM YYYY');
      if (!dataMap[monthYear]) dataMap[monthYear] = 0;
      dataMap[monthYear] += exp.amount;
    });

    // Sort chronologically (assuming expenses might not be strictly sorted)
    return Object.keys(dataMap)
      .sort((a, b) => moment(a, 'MMM YYYY').valueOf() - moment(b, 'MMM YYYY').valueOf())
      .map(key => ({ name: key, total: dataMap[key] }));
  }, [expenses]);

  // Process data for Pie Chart (Category Distribution)
  const categoryData = useMemo(() => {
    const dataMap = {};
    let totalExpenses = 0;
    expenses.forEach(exp => {
      if (!dataMap[exp.category]) dataMap[exp.category] = 0;
      dataMap[exp.category] += exp.amount;
      totalExpenses += exp.amount;
    });

    return Object.keys(dataMap).map(key => ({
      name: key,
      value: dataMap[key],
      percentage: totalExpenses ? ((dataMap[key] / totalExpenses) * 100).toFixed(1) : 0
    }));
  }, [expenses]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100">
          <p className="font-semibold text-slate-800">{data.name}</p>
          <p className="text-indigo-600 font-medium">{formatCurrency(data.value || data.total)}</p>
          {data.percentage && <p className="text-xs text-slate-500 mt-1">{data.percentage}% of total</p>}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col gap-8 w-full h-full">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 bg-slate-200 rounded w-32"></div>
        </div>
        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-28 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between">
              <div className="h-10 w-10 bg-slate-100 rounded-full"></div>
              <div className="h-6 bg-slate-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-[300px]">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 h-full">
            <div className="h-6 bg-slate-100 rounded w-1/3 mb-6"></div>
            <div className="h-full bg-slate-50 rounded-xl"></div>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 h-full">
            <div className="h-6 bg-slate-100 rounded w-1/3 mb-6"></div>
            <div className="h-full bg-slate-50 rounded-xl flex items-center justify-center">
              <div className="h-40 w-40 rounded-full bg-slate-100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6 md:mb-8 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white font-medium py-1.5 px-3 md:py-2.5 md:px-5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 md:gap-2 shadow-sm text-sm md:text-base shrink-0"
        >
          <PlusCircle className="h-4 w-4 md:h-5 md:w-5" />
          <span className="whitespace-nowrap">Add Expense</span>
        </button>
      </div>

      <ExpenseSummary expenses={expenses} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Monthly Expense Trend</h3>
          <div className="h-80">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No data available</div>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Expense by Category</h3>
          <div className="h-80">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">No data available</div>
            )}
          </div>
        </div>
      </div>

      <ExpenseForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={addExpense}
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

export default Dashboard;
