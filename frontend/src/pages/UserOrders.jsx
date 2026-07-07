import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useOrderStore from '../store/OrderStore'

function UserOrders() {
  const { orders, fetchUserOrders, cancelUserOrder, loading, error } = useOrderStore()

  useEffect(() => {
    fetchUserOrders()
  }, [fetchUserOrders])

  const activeOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "confirmed"
  )
  const completedOrders = orders.filter(
    (order) => order.status === "delivered" || order.status === "cancelled"
  )

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await cancelUserOrder(orderId)
      } catch (err) {
        console.error("Failed to cancel order:", err)
      }
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
      case "confirmed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getProgressWidth = (status) => {
    switch (status) {
      case "pending":
        return "w-[25%]"
      case "confirmed":
        return "w-[60%]"
      case "delivered":
        return "w-[100%]"
      case "cancelled":
        return "w-[0%]"
      default:
        return "w-[0%]"
    }
  }

  const getProgressLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pending Confirmation"
      case "confirmed":
        return "Confirmed & Dispatched"
      case "delivered":
        return "Delivered successfully"
      case "cancelled":
        return "Cancelled"
      default:
        return ""
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-border flex justify-between items-center px-5 h-16 font-sans antialiased">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded-full active:opacity-80 active:scale-95">
            <span className="material-symbols-outlined text-blue-600">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">Go Gallon</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <img alt="User profile photo" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=User&background=0058bf&color=fff"/>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-0 max-w-[1000px] mx-auto">
        {/* Header Section */}
        <section className="mb-8">
          <h2 className="text-[32px] font-bold text-foreground mb-1 tracking-tight">Order History</h2>
          <p className="text-[16px] text-muted-foreground">Track active deliveries and review your past orders.</p>
        </section>

        {error && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 mb-6" role="alert">
            {error}
          </div>
        )}

        {loading && orders.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Active Orders Section */}
            <div>
              <h3 className="text-[20px] font-bold text-foreground mb-4 flex items-center gap-2">
                Active Orders
                <span className="bg-primary/10 text-primary text-[12px] font-bold px-2 py-0.5 rounded-full">
                  {activeOrders.length}
                </span>
              </h3>
              {activeOrders.length === 0 ? (
                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-border/30 dark:border-slate-700/50 text-center text-muted-foreground text-sm font-medium">
                  No active orders at the moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeOrders.map((order) => (
                    <div key={order._id} className="bg-white dark:bg-slate-800/80 rounded-xl border border-border/40 dark:border-slate-700/50 shadow-sm p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="text-[12px] font-medium text-muted-foreground block">
                              Ordered: {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <Link to={`/orders/${order._id}`} className="text-[12px] font-semibold text-primary block hover:underline">
                              Order ID: #{order._id.slice(-6).toUpperCase()}
                            </Link>
                          </div>
                          <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <h4 className="text-[18px] font-bold text-foreground mb-1">{order.gallons}x 20L Spring Water</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Delivery ETA: {new Date(order.deliveryTime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                        
                        {order.address && (
                          <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg text-[13px] text-muted-foreground mb-4">
                            <strong className="text-foreground">Delivery Address:</strong><br/>
                            {order.address.roomNo}, {order.address.building}, {order.address.street}, {order.address.city}
                          </div>
                        )}

                        <div className="mb-4">
                          <div className="flex justify-between text-[11px] font-semibold mb-1">
                            <span className="text-primary">{getProgressLabel(order.status)}</span>
                            <span className="text-muted-foreground">Amount: ₹{order.price.toFixed(2)}</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r from-primary to-accent rounded-full ${getProgressWidth(order.status)}`}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <Link 
                          to={`/orders/${order._id}`}
                          className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-center py-2 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          Track Details
                        </Link>
                        {order.status === "pending" && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="flex-1 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed & Cancelled Orders Section */}
            <div>
              <h3 className="text-[20px] font-bold text-foreground mb-4 flex items-center gap-2">
                Order History
                <span className="bg-slate-100 text-slate-700 text-[12px] font-bold px-2 py-0.5 rounded-full">
                  {completedOrders.length}
                </span>
              </h3>
              {completedOrders.length === 0 ? (
                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-border/30 dark:border-slate-700/50 text-center text-muted-foreground text-sm font-medium">
                  No completed or cancelled orders.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedOrders.map((order) => (
                    <div key={order._id} className="bg-white dark:bg-slate-800/80 rounded-xl border border-border/30 dark:border-slate-700/50 p-6 flex flex-col justify-between hover:border-primary/20 transition-all">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-[12px] font-medium text-muted-foreground block">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <Link to={`/orders/${order._id}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors block hover:underline">
                              {order.gallons}x 20L Spring Water
                            </Link>
                            <span className="text-[10px] text-muted-foreground">ID: #{order._id.slice(-6).toUpperCase()}</span>
                          </div>
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-[12px] text-muted-foreground space-y-1 mb-4">
                          <p>
                            <span className="font-semibold text-foreground">Total:</span> ₹{order.price.toFixed(2)} ({order.paymentMethod === 'cash' ? 'Cash' : 'Online'})
                          </p>
                          {order.address && (
                            <p className="truncate">
                              <span className="font-semibold text-foreground">Delivered to:</span> {order.address.building}, {order.address.city}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/orders/${order._id}`}
                          className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-center py-2 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          Details
                        </Link>
                        <Link
                          to="/place-order"
                          className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-center py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">replay</span>
                          Reorder
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FAB for Quick Reorder */}
      <Link to="/place-order" className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40">
        <span className="material-symbols-outlined">bolt</span>
      </Link>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,119,255,0.06)] z-50 rounded-t-2xl font-sans text-[11px] font-medium">
        <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined mb-1">home</span>
          Home
        </Link>
        <Link to="/orders" className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">reorder</span>
          Orders
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined mb-1">person</span>
          Profile
        </Link>
      </nav>
    </div>
  )
}

export default UserOrders
