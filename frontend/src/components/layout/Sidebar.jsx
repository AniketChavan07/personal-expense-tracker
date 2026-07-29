import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, IndianRupee, Wallet } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white md:w-64 fixed bottom-0 left-0 w-full md:h-screen border-t md:border-t-0 md:border-r border-slate-200 md:top-0 flex flex-row md:flex-col z-50 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] md:shadow-none">
      
      {/* Desktop Header (Logo) */}
      <Link to="/" className="hidden md:flex p-6 items-center gap-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <span className="font-bold text-xl text-slate-900 tracking-tight">
          Expenso
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-row md:flex-col w-full h-16 md:h-auto justify-around md:justify-start items-center md:items-stretch px-2 md:px-4 md:py-6 md:space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 py-1 md:px-4 md:py-3 rounded-xl font-medium transition-colors w-24 md:w-auto ${
              isActive
                ? 'text-indigo-600 md:bg-indigo-50'
                : 'text-slate-500 hover:text-slate-900 md:hover:bg-slate-50'
            }`
          }
        >
          <LayoutDashboard className="h-6 w-6 md:h-5 md:w-5" />
          <span className="text-[10px] md:text-base font-semibold md:font-medium">Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 py-1 md:px-4 md:py-3 rounded-xl font-medium transition-colors w-24 md:w-auto ${
              isActive
                ? 'text-indigo-600 md:bg-indigo-50'
                : 'text-slate-500 hover:text-slate-900 md:hover:bg-slate-50'
            }`
          }
        >
          <IndianRupee className="h-6 w-6 md:h-5 md:w-5" />
          <span className="text-[10px] md:text-base font-semibold md:font-medium">Expenses</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
