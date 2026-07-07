import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useOrderStore from '../store/OrderStore'
import useToastStore from '../store/ToastStore'

function Admin() {
  const { adminOrders, fetchAdminOrders, updateOrderStatus, loading: ordersLoading } = useOrderStore()
  const addToast = useToastStore((state) => state.addToast)

  useEffect(() => {
    fetchAdminOrders()
  }, [fetchAdminOrders])

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus })
      addToast(`Order #${orderId.slice(-6).toUpperCase()} status updated to: ${newStatus.toUpperCase()}`, "success")
    } catch (err) {
      addToast("Failed to update status: " + (err.response?.data?.message || err.message), "error")
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-blue-50 dark:border-slate-800 shadow-sm docked top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-5 h-16 max-w-7xl mx-auto">
          <div className="w-[100px]"></div>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-sans antialiased">Go Gallon Admin</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/stats" className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-lg hover:bg-primary/95 transition-all flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">bar_chart</span>
              View Stats
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
              <img alt="Admin Avatar" src="https://ui-avatars.com/api/?name=Admin&background=0058bf&color=fff"/>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-0 pt-6 space-y-6">
        {/* Order Management Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[20px] font-bold text-foreground">Order Management</h3>
            <span className="text-[12px] font-semibold text-muted-foreground uppercase">
              {adminOrders.length} Total Orders
            </span>
          </div>

          {ordersLoading && adminOrders.length === 0 ? (
            <div className="flex justify-center py-12 bg-white dark:bg-slate-800/80 rounded-2xl border border-blue-50 dark:border-slate-700/50">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : adminOrders.length === 0 ? (
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-blue-50 dark:border-slate-700/50 text-center text-muted-foreground text-sm font-medium">
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
                  <div key={order._id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 dark:border-slate-700/50 flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">Order #{order._id.slice(-6).toUpperCase()}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${statusColors[order.status] || "bg-slate-50"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong className="text-foreground">Customer:</strong> {order.owner?.name} ({order.owner?.email})</p>
                        <p><strong className="text-foreground">Quantity:</strong> {order.gallons} x 20L Gallons — <strong className="text-foreground">Total Price:</strong> ₹{order.price.toFixed(2)}</p>
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
                            className="flex-1 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 hover:bg-green-600 hover:text-white py-1.5 rounded-lg text-xs font-bold border border-green-100 dark:border-green-900/30 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">done</span>
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(order._id, "cancelled")}
                            className="flex-1 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 hover:bg-red-600 hover:text-white py-1.5 rounded-lg text-xs font-bold border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                            Cancel
                          </button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <button
                          onClick={() => handleUpdateStatus(order._id, "delivered")}
                          className="w-full bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 hover:bg-blue-600 hover:text-white py-2 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-900/30 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">local_shipping</span>
                          Mark Delivered
                        </button>
                      )}
                      {(order.status === "delivered" || order.status === "cancelled") && (
                        <span className="text-[11px] font-semibold text-muted-foreground text-center py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg w-full block">
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
      </main>
    </div>
  )
}

export default Admin
