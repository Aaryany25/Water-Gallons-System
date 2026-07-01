import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/AuthStore'

function Navbar() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg docked full-width top-0 sticky border-b border-blue-50 dark:border-slate-800 shadow-sm z-50">
      <div className="flex justify-between items-center w-full px-5 h-16 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">water_drop</span>
          <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-h2">HydroFlow</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/place-order" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Place Order</Link>
              <Link to="/orders" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">My Orders</Link>
              <Link to="/profile" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Profile</Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Admin Panel</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Login</Link>
              <Link to="/signup" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Sign Up</Link>
            </>
          )}
        </nav>
        
        {isAuthenticated && user && (
          <Link to="/profile" className="flex items-center gap-3">
            <span className="hidden md:inline text-xs font-semibold text-muted-foreground">{user.name}</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-container/20">
              <img alt="User Avatar" className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0058bf&color=fff`} />
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar