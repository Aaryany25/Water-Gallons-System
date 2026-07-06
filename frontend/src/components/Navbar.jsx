import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/AuthStore'

function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg docked full-width top-0 sticky border-b border-blue-50 dark:border-slate-800 shadow-sm z-50">
      <div className="flex justify-between items-center w-full px-5 h-16 max-w-7xl mx-auto">
        <Link to={user?.role === "admin" ? "/admin" : "/"} className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">water_drop</span>
          <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-h2">HydroFlow</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          {user?.role !== "admin" && (
            <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Home</Link>
          )}
          
          {isAuthenticated ? (
            user?.role === "admin" ? (
              <>
                <Link to="/admin" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Admin Dashboard</Link>
                <Link to="/admin/stats" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Stats & Users</Link>
              </>
            ) : (
              <>
                <Link to="/place-order" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Place Order</Link>
                <Link to="/orders" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">My Orders</Link>
                <Link to="/profile" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Profile</Link>
              </>
            )
          ) : (
            <>
              <Link to="/login" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/30 transition-colors text-[14px] font-sans px-2 rounded-md py-1">Admin Login</Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer flex items-center justify-center"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              {user.role === "admin" && (
                <button 
                  onClick={async () => {
                    await useAuthStore.getState().logout();
                    window.location.href = "/login";
                  }}
                  className="text-slate-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50/10 transition-colors text-[14px] font-sans px-3 py-1.5 rounded-lg cursor-pointer font-semibold"
                >
                  Logout
                </button>
              )}
              <Link to={user.role === "admin" ? "/admin" : "/profile"} className="flex items-center gap-3">
                <span className="hidden md:inline text-xs font-semibold text-muted-foreground">{user.name}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-container/20">
                  <img alt="User Avatar" className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0058bf&color=fff`} />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar