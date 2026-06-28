import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useOrderStore from '../store/OrderStore'
import { fetchAllUsers } from '../api/Authapi'

function Admin() {
  const { adminOrders, fetchAdminOrders, updateOrderStatus, loading: ordersLoading } = useOrderStore()
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

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus })
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message))
    }
  }

  // Calculate Metrics
  const totalRevenue = adminOrders
    .filter(o => o.status === "delivered" || o.status === "confirmed")
    .reduce((sum, o) => sum + (o.price || 0), 0)

  const activeDeliveries = adminOrders.filter(o => o.status === "confirmed" || o.status === "pending").length

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-blue-50 dark:border-slate-800 shadow-sm docked top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-5 h-16 max-w-7xl mx-auto">
          <Link to="/" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-sans antialiased">HydroFlow Admin</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <img alt="Admin Avatar" src="https://ui-avatars.com/api/?name=Admin&background=0058bf&color=fff"/>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-0 pt-6 space-y-6">
        {errorMsg && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5" role="alert">
            {errorMsg}
          </div>
        )}

        {/* Dashboard Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,119,255,0.06)] flex flex-col justify-between overflow-hidden relative border border-blue-50">
            <div className="z-10">
              <p className="font-semibold text-[14px] text-muted-foreground mb-1">Total System Revenue</p>
              <h2 className="text-[32px] font-bold text-primary">${totalRevenue.toFixed(2)}</h2>
              <div className="flex items-center gap-1 mt-2 text-green-600 font-semibold text-[12px]">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>Active & Delivered orders</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-primary">
              <span className="material-symbols-outlined text-[120px]">payments</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,119,255,0.06)] flex flex-col justify-between overflow-hidden relative border border-blue-50">
            <div className="z-10">
              <p className="font-semibold text-[14px] text-muted-foreground mb-1">Active Deliveries</p>
              <h2 className="text-[32px] font-bold text-accent-foreground">{activeDeliveries}</h2>
              <p className="font-medium text-[12px] text-muted-foreground mt-2">Pending confirmation or in transit</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-accent">
              <span className="material-symbols-outlined text-[120px]">local_shipping</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,119,255,0.06)] flex flex-col justify-between overflow-hidden relative border border-blue-50">
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Order Management Section */}
          <section className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] font-bold text-foreground">Order Management</h3>
              <span className="text-[12px] font-semibold text-muted-foreground uppercase">
                {adminOrders.length} Total Orders
              </span>
            </div>

            {ordersLoading && adminOrders.length === 0 ? (
              <div className="flex justify-center py-12 bg-white rounded-2xl border border-blue-50">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : adminOrders.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-blue-50 text-center text-muted-foreground text-sm font-medium">
                No orders placed in the system yet.
              </div>
            ) : (
              <div className="space-y-4">
                {adminOrders.map((order) => {
                  const statusColors = {
                    pending: "bg-orange-50 text-orange-700 border-orange-100",
                    confirmed: "bg-blue-50 text-blue-700 border-blue-100",
                    delivered: "bg-green-50 text-green-700 border-green-100",
                    cancelled: "bg-red-50 text-red-700 border-red-100",
                  }
                  
                  return (
                    <div key={order._id} className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">Order #{order._id.slice(-6).toUpperCase()}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${statusColors[order.status] || "bg-slate-50"}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p><strong className="text-foreground">Customer:</strong> {order.owner?.name} ({order.owner?.email})</p>
                          <p><strong className="text-foreground">Quantity:</strong> {order.gallons} x 20L Gallons — <strong className="text-foreground">Total Price:</strong> ${order.price.toFixed(2)}</p>
                          <p><strong className="text-foreground">Schedule:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>
                          {order.note && <p><strong className="text-foreground">Delivery Note:</strong> "{order.note}"</p>}
                          {order.address && (
                            <p className="truncate"><strong className="text-foreground">Address:</strong> {order.address.roomNo}, {order.address.building}, {order.address.street}, {order.address.city}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0 md:w-36">
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(order._id, "confirmed")}
                              className="flex-1 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white py-1.5 rounded-lg text-xs font-bold border border-green-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">done</span>
                              Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order._id, "cancelled")}
                              className="flex-1 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white py-1.5 rounded-lg text-xs font-bold border border-red-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">close</span>
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <button
                            onClick={() => handleUpdateStatus(order._id, "delivered")}
                            className="w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-2 rounded-lg text-xs font-bold border border-blue-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                            Mark Delivered
                          </button>
                        )}
                        {(order.status === "delivered" || order.status === "cancelled") && (
                          <span className="text-[11px] font-semibold text-muted-foreground text-center py-2 bg-slate-50 rounded-lg w-full block">
                            No actions required
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Registered Users Section */}
          <aside className="lg:col-span-4 space-y-4">
            <h3 className="text-[20px] font-bold text-foreground">Registered Customers</h3>
            
            {usersLoading && users.length === 0 ? (
              <div className="flex justify-center py-8 bg-white rounded-2xl border border-blue-50">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 space-y-3 max-h-[500px] overflow-y-auto">
                {users.map((user) => (
                  <div key={user._id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <img 
                      className="w-8 h-8 rounded-full object-cover shrink-0" 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0058bf&color=fff`} 
                      alt="avatar" 
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Admin
