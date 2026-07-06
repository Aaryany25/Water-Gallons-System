import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAddressStore from '../store/AddressStore'
import useOrderStore from '../store/OrderStore'

function PlaceOrder() {
  const navigate = useNavigate()
  const { addresses, fetchAddresses, defaultAddress } = useAddressStore()
  const { placeOrder, loading: orderLoading } = useOrderStore()

  // Form States
  const [gallons, setGallons] = useState(1) // default 1 gallon minimum
  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState("morning") // "morning" (9am) or "afternoon" (2pm)
  const [paymentMethod, setPaymentMethod] = useState("cash") // "cash" or "online"
  const [note, setNote] = useState("")
  const [submitError, setSubmitError] = useState("")

  // Generate next 5 days
  const dateOptions = Array.from({ length: 5 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress._id)
    } else if (addresses.length > 0) {
      setSelectedAddressId(addresses[0]._id)
    }
  }, [defaultAddress, addresses])

  const RATE_PER_GALLON = 129
  const DELIVERY_FEE = 5
  const totalAmount = (gallons * RATE_PER_GALLON) + DELIVERY_FEE

  const handlePlaceOrder = async () => {
    setSubmitError("")
    if (!selectedAddressId) {
      setSubmitError("Please select or add a delivery address first.")
      return
    }

    const date = dateOptions[selectedDateIndex]
    const deliveryTime = new Date(date)
    if (selectedSlot === "morning") {
      deliveryTime.setHours(9, 0, 0, 0)
    } else {
      deliveryTime.setHours(14, 0, 0, 0)
    }

    try {
      await placeOrder({
        address: selectedAddressId,
        gallons,
        deliveryTime: deliveryTime.toISOString(),
        paymentMethod,
        note: note.trim()
      })
      navigate("/orders")
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
        err.message ||
        "Failed to place order. Please try again."
      )
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-50/20 shadow-sm">
        <div className="flex items-center justify-between px-5 h-16 w-full max-w-[1200px] mx-auto">
          <Link to="/" className="transition-all duration-200 active:scale-95 text-blue-600">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-sans font-bold text-lg text-foreground">Place Order</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=User&background=0058bf&color=fff"/>
          </div>
        </div>
      </header>

      <main className="pt-20 px-5 md:px-0 max-w-[600px] mx-auto space-y-6">
        {submitError && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5" role="alert">
            {submitError}
          </div>
        )}

        {/* Quantity Selection Section */}
        <section className="space-y-3">
          <span className="text-[14px] font-semibold text-muted-foreground">Select Quantity</span>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 dark:border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/30 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]">water_drop</span>
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-foreground">20L Pure Spring</h3>
                <p className="text-[12px] font-medium text-muted-foreground">Glacier Fresh Water</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-muted rounded-full p-1">
              <button 
                type="button"
                onClick={() => setGallons(prev => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-blue-400 transition-all active:scale-90 cursor-pointer"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <span className="text-[20px] font-semibold px-2">{String(gallons).padStart(2, '0')}</span>
              <button 
                type="button"
                onClick={() => setGallons(prev => prev + 1)}
                className="w-10 h-10 rounded-full bg-primary text-white shadow-md flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </section>

        {/* Delivery Date & Time */}
        <section className="space-y-3">
          <span className="text-[14px] font-semibold text-muted-foreground">Delivery Schedule</span>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 dark:border-slate-700/50">
            {/* Date Picker Scroll */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {dateOptions.map((date, idx) => {
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                const dayNum = date.getDate()
                const isSelected = selectedDateIndex === idx
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDateIndex(idx)}
                    className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
                      isSelected 
                        ? "bg-primary text-white shadow-lg" 
                        : "bg-muted dark:bg-slate-800 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span className={`text-[12px] font-medium ${isSelected ? "opacity-80" : ""}`}>{dayName}</span>
                    <span className="text-[20px] font-semibold">{dayNum}</span>
                  </button>
                )
              })}
            </div>
            {/* Time Slots */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-50/20 dark:border-slate-700/30">
              <button
                type="button"
                onClick={() => setSelectedSlot("morning")}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 font-semibold text-[14px] transition-all cursor-pointer ${
                  selectedSlot === "morning"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent bg-muted text-muted-foreground hover:border-border"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                09:00 - 12:00
              </button>
              <button
                type="button"
                onClick={() => setSelectedSlot("afternoon")}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 font-semibold text-[14px] transition-all cursor-pointer ${
                  selectedSlot === "afternoon"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent bg-muted text-muted-foreground hover:border-border"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                02:00 - 05:00
              </button>
            </div>
          </div>
        </section>

        {/* Delivery Address */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold text-muted-foreground">Delivery Address</span>
            <Link to="/profile/addresses" className="text-primary font-semibold text-[14px] flex items-center gap-1 hover:underline">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Manage
            </Link>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-4 flex items-start gap-4 shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 dark:border-slate-700/50">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            
            {addresses.length === 0 ? (
              <div className="flex-1 py-1">
                <p className="text-[14px] font-semibold text-foreground">No address added yet</p>
                <Link to="/profile/addresses" className="text-primary font-semibold text-[12px] hover:underline">
                  + Click here to add a delivery address
                </Link>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-foreground">Select Address</h3>
                <select
                  value={selectedAddressId}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-border/40 font-sans focus:ring-0 text-[14px] text-muted-foreground outline-none font-medium mt-1 pb-1 cursor-pointer"
                >
                  {addresses.map((addr) => (
                    <option key={addr._id} value={addr._id} className="text-foreground dark:bg-slate-800">
                      {addr.roomNo}, {addr.building}, {addr.street}, {addr.city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-3">
          <span className="text-[14px] font-semibold text-muted-foreground">Payment Method</span>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 font-semibold text-[14px] transition-all cursor-pointer ${
                paymentMethod === "cash" 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-transparent bg-white/80 dark:bg-slate-800/80 text-muted-foreground hover:border-border"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Cash on Delivery
            </button>
            <button 
              type="button"
              disabled
              className="flex items-center gap-3 p-3 rounded-lg border-2 border-transparent bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60 font-semibold text-[14px]"
              title="Online payment is currently pending integration."
            >
              <span className="material-symbols-outlined text-[18px]">credit_card</span>
              <div className="flex flex-col items-start">
                <span>Online Payment</span>
                <span className="text-[9px] text-orange-500 font-bold uppercase tracking-wider">Pending Integration</span>
              </div>
            </button>
          </div>
        </section>

        {/* Delivery Note */}
        <section className="space-y-3">
          <span className="text-[14px] font-semibold text-muted-foreground">Delivery Note (Optional)</span>
          <textarea
            placeholder="e.g. Leave at front door, ring doorbell once, etc."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-blue-50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-sans text-foreground"
            rows={2}
          />
        </section>

        {/* Order Summary Card */}
        <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-4 bg-primary/5 border border-primary/10 dark:border-slate-700/50">
          <h3 className="text-[14px] font-semibold text-primary mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[14px]">
              <span className="text-muted-foreground">{gallons}x 20L Water Bottles</span>
              <span className="text-foreground font-semibold">₹{(gallons * RATE_PER_GALLON).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="text-foreground font-semibold">₹{DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="h-px bg-primary/10 my-3"></div>
            <div className="flex justify-between text-[20px] font-semibold text-primary">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-blue-50/10 dark:border-slate-800/50 p-5 z-50">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={orderLoading || addresses.length === 0}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-[20px] font-semibold flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(0,88,191,0.3)] transition-all active:scale-95 hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
        >
          {orderLoading ? "Processing..." : "Place Order"}
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder
