import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getOrderDetails, cancelOrder } from '../api/Orderapi'

function OrderDetails() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    loadOrderDetails()
  }, [orderId])

  const loadOrderDetails = async () => {
    setLoading(true)
    setErrorMsg("")
    try {
      const response = await getOrderDetails(orderId)
      setOrder(response.data || null)
    } catch (err) {
      console.error("Failed to load order details", err)
      setErrorMsg(err.response?.data?.message || "Failed to load order details")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setCancelling(true)
      try {
        await cancelOrder(orderId)
        await loadOrderDetails() // reload status
      } catch (err) {
        alert("Failed to cancel order: " + (err.response?.data?.message || err.message))
      } finally {
        setCancelling(false)
      }
    }
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending Confirmation",
          color: "text-orange-600 bg-orange-50 border-orange-100",
          stepIndex: 1,
        }
      case "confirmed":
        return {
          label: "Confirmed & Dispatched",
          color: "text-blue-600 bg-blue-50 border-blue-100",
          stepIndex: 2,
        }
      case "delivered":
        return {
          label: "Delivered",
          color: "text-green-600 bg-green-50 border-green-100",
          stepIndex: 3,
        }
      case "cancelled":
        return {
          label: "Cancelled",
          color: "text-red-600 bg-red-50 border-red-100",
          stepIndex: 0,
        }
      default:
        return {
          label: status,
          color: "text-slate-600 bg-slate-50 border-slate-100",
          stepIndex: 1,
        }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (errorMsg || !order) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center bg-white dark:bg-slate-800/80 rounded-2xl shadow-md border border-red-50 dark:border-red-950/20">
        <span className="material-symbols-outlined text-[48px] text-destructive mb-3">error</span>
        <h3 className="text-lg font-bold text-foreground">Error Loading Order</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-6">{errorMsg || "Order details could not be found."}</p>
        <Link to="/orders" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm transition-all hover:bg-primary/95">
          Back to My Orders
        </Link>
      </div>
    )
  }

  const statusInfo = getStatusInfo(order.status)

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-border flex justify-between items-center px-5 h-16 font-sans antialiased">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded-full active:opacity-80 active:scale-95">
            <span className="material-symbols-outlined text-blue-600">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">Order Details</h1>
        </div>
        <div className="text-[12px] font-semibold text-muted-foreground">
          ID: #{order._id.slice(-6).toUpperCase()}
        </div>
      </header>

      <main className="pt-24 px-5 md:px-0 max-w-[650px] mx-auto space-y-6">
        {/* Status Tracker */}
        <section className="bg-white/85 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-blue-50 dark:border-slate-700/80 shadow-[0_4px_20px_rgba(0,119,255,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order Status</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

          {order.status === "cancelled" ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
              <span className="material-symbols-outlined">cancel</span>
              <div>
                <p className="text-sm font-semibold">This order has been cancelled</p>
                <p className="text-xs text-red-500/80">Funds or arrangements (if any) have been halted.</p>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-between mt-4">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-700 -z-10">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                  style={{ width: statusInfo.stepIndex === 1 ? '33%' : statusInfo.stepIndex === 2 ? '66%' : '100%' }}
                ></div>
              </div>

              {/* Step 1: Placed */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border z-10 transition-all ${
                  statusInfo.stepIndex >= 1 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white border-slate-200 text-slate-400"
                }`}>
                  1
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Placed</span>
              </div>

              {/* Step 2: Confirmed */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border z-10 transition-all ${
                  statusInfo.stepIndex >= 2 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white border-slate-200 text-slate-400"
                }`}>
                  2
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Confirmed</span>
              </div>

              {/* Step 3: Delivered */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border z-10 transition-all ${
                  statusInfo.stepIndex >= 3 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white border-slate-200 text-slate-400"
                }`}>
                  3
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Delivered</span>
              </div>
            </div>
          )}
        </section>

        {/* Order Details */}
        <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-blue-50 dark:border-slate-700/80 shadow-[0_4px_20px_rgba(0,119,255,0.04)] space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-slate-50 dark:border-slate-700/50 pb-2">Order Items</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">water_drop</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{order.gallons}x 20L Spring Water Gallon</h4>
                <p className="text-xs text-muted-foreground">Glacier purity purified water</p>
              </div>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-100">₹{order.price.toFixed(2)}</span>
          </div>

          <div className="border-t border-slate-50 dark:border-slate-700/50 pt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Schedule:</span>
              <span className="font-semibold text-foreground">
                {new Date(order.deliveryTime).toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-semibold text-foreground uppercase">
                {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment (Pending)'}
              </span>
            </div>
            {order.note && (
              <div className="pt-2">
                <p className="text-muted-foreground mb-1">Delivery Instruction Note:</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg italic text-slate-600 dark:text-slate-400 font-medium">
                  "{order.note}"
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Shipping Address */}
        <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-blue-50 dark:border-slate-700/80 shadow-[0_4px_20px_rgba(0,119,255,0.04)] space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-slate-50 dark:border-slate-700/50 pb-2">Delivery Address</h3>
          {order.address ? (
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
              <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <p className="font-bold text-slate-800 dark:text-slate-100">{order.address.roomNo}, {order.address.building}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city} - {order.address.pincode}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No address associated with this order.</p>
          )}
        </section>

        {/* Pricing Summary */}
        <section className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10 space-y-3">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>Water Charges ({order.gallons} Gallons)</span>
            <span>₹{order.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>Delivery Service Fee</span>
            <span>₹5.00</span>
          </div>
          <div className="h-px bg-primary/10 my-2"></div>
          <div className="flex justify-between text-lg font-bold text-primary dark:text-blue-400">
            <span>Paid Total</span>
            <span>₹{(order.price + 5).toFixed(2)}</span>
          </div>
        </section>

        {/* Action Button */}
        {order.status === "pending" && (
          <button
            type="button"
            disabled={cancelling}
            onClick={handleCancelOrder}
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/95 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {cancelling ? "Cancelling Order..." : "Cancel Water Order"}
          </button>
        )}
        
        {order.status !== "pending" && (
          <Link
            to="/place-order"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/95 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined">replay</span>
            Reorder Fresh Gallon
          </Link>
        )}
      </main>
    </div>
  )
}

export default OrderDetails
