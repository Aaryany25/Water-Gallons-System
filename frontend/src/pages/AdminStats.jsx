import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useOrderStore from '../store/OrderStore'
import { fetchAllUsers } from '../api/Authapi'

function AdminStats() {
  const { adminOrders, fetchAdminOrders, loading: ordersLoading } = useOrderStore()
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    fetchAdminOrders()
    loadUsers()
  }, [fetchAdminOrders])

  const loadUsers = async () => {
    setUsersLoading(true)
    setErrorMsg("")
    try {
      const response = await fetchAllUsers()
      setUsers(response.data || [])
    } catch (err) {
      console.error("Failed to load users", err)
      setErrorMsg(err.response?.data?.message || "Failed to load users list")
    } finally {
      setUsersLoading(false)
    }
  }

  // Calculate Metrics
  const totalRevenue = adminOrders
    .filter(o => o.status === "delivered" || o.status === "confirmed")
    .reduce((sum, o) => sum + (o.price || 0), 0)

  const activeDeliveries = adminOrders.filter(o => o.status === "confirmed" || o.status === "pending").length

  return (
    <div className="bg-background text-foreground min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-blue-50 dark:border-slate-800 shadow-sm docked top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-5 h-16 max-w-7xl mx-auto">
          <Link to="/admin" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Orders
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-sans antialiased">Gallon Go  Stats</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <img alt="Admin Avatar" src="https://ui-avatars.com/api/?name=Admin&background=0058bf&color=fff" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-0 pt-6 space-y-8">
        {errorMsg && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5" role="alert">
            {errorMsg}
          </div>
        )}

        {/* Dashboard Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,119,255,0.06)] flex flex-col justify-between overflow-hidden relative border border-blue-50 dark:border-slate-700">
            <div className="z-10">
              <p className="font-semibold text-[14px] text-muted-foreground mb-1">Total System Revenue</p>
              <h2 className="text-[32px] font-bold text-primary dark:text-blue-400">₹{totalRevenue.toFixed(2)}</h2>
              <div className="flex items-center gap-1 mt-2 text-green-600 font-semibold text-[12px]">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>Active & Delivered orders</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-primary dark:text-blue-400">
              <span className="material-symbols-outlined text-[120px]">payments</span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,119,255,0.06)] flex flex-col justify-between overflow-hidden relative border border-blue-50 dark:border-slate-700">
            <div className="z-10">
              <p className="font-semibold text-[14px] text-muted-foreground mb-1">Active Deliveries</p>
              <h2 className="text-[32px] font-bold text-slate-800 dark:text-slate-100">{activeDeliveries}</h2>
              <p className="font-medium text-[12px] text-muted-foreground mt-2">Pending confirmation or in transit</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-accent">
              <span className="material-symbols-outlined text-[120px]">local_shipping</span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,119,255,0.06)] flex flex-col justify-between overflow-hidden relative border border-blue-50 dark:border-slate-700">
            <div className="z-10">
              <p className="font-semibold text-[14px] text-muted-foreground mb-1">Registered Customers</p>
              <h2 className="text-[32px] font-bold text-foreground">{users.length}</h2>
              <p className="font-medium text-[12px] text-muted-foreground mt-2">Active accounts in system</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-slate-400">
              <span className="material-symbols-outlined text-[120px]">group</span>
            </div>
          </div>
        </section>

        {/* Registered Customers List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[22px] font-bold text-foreground">Registered Customers Directory</h3>
            <span className="text-[12px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full uppercase">
              {users.length} Customers
            </span>
          </div>

          {usersLoading && users.length === 0 ? (
            <div className="flex justify-center py-12 bg-white dark:bg-slate-800/80 rounded-2xl border border-blue-50 dark:border-slate-700">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-blue-50 dark:border-slate-700 text-center text-muted-foreground text-sm font-medium">
              No registered customers found.
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-blue-50 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,119,255,0.04)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {users.map((user) => (
                  <div key={user._id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 hover:shadow-md transition-shadow">
                    <img
                      className="w-12 h-12 rounded-full object-cover border border-primary/10 shrink-0"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0058bf&color=fff`}
                      alt="avatar"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <span className="inline-block px-2 py-0.5 mt-1.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                        {user.role || 'customer'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default AdminStats
