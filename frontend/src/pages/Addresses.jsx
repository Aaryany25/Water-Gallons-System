import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAddressStore from '../store/AddressStore'

function Addresses() {
  const { addresses, fetchAddresses, addAddress, editAddress, removeAddress, setDefault, loading, error } = useAddressStore()

  const [isEditing, setIsEditing] = useState(false)
  const [currentAddress, setCurrentAddress] = useState(null) // null for adding, address object for editing

  // Form states
  const [roomNo, setRoomNo] = useState("")
  const [building, setBuilding] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const openAddForm = () => {
    setCurrentAddress(null)
    setRoomNo("")
    setBuilding("")
    setStreet("")
    setCity("")
    setPincode("")
    setFormError("")
    setIsEditing(true)
  }

  const openEditForm = (addr) => {
    setCurrentAddress(addr)
    setRoomNo(addr.roomNo)
    setBuilding(addr.building)
    setStreet(addr.street)
    setCity(addr.city)
    setPincode(addr.pincode)
    setFormError("")
    setIsEditing(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // Validate pincode (6-digit Indian pincode)
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setFormError("Please enter a valid 6-digit pincode.")
      return
    }

    const payload = { roomNo, building, street, city, pincode }

    try {
      if (currentAddress) {
        await editAddress(currentAddress._id, payload)
      } else {
        await addAddress(payload)
      }
      setIsEditing(false)
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
        err.message ||
        "Failed to save address. Please try again."
      )
    }
  }

  const handleDelete = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await removeAddress(addressId)
      } catch (err) {
        console.error("Failed to delete address", err)
      }
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-border flex justify-between items-center px-5 h-16 font-sans antialiased">
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded-full active:opacity-80 active:scale-95">
            <span className="material-symbols-outlined text-blue-600">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">HydroFlow</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold text-[14px] rounded-full hover:bg-primary/95 transition-colors active:scale-95 cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Address
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-5 md:px-0 max-w-[800px] mx-auto space-y-6">
        <div>
          <h2 className="text-[32px] font-bold text-foreground mb-1">My Addresses</h2>
          <p className="text-[16px] text-muted-foreground">Manage your delivery locations and select a default shipping address</p>
        </div>

        {error && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5" role="alert">
            {error}
          </div>
        )}

        {loading && addresses.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-dashed border-border text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">home_pin</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">No saved addresses</h3>
              <p className="text-sm text-muted-foreground">Add a delivery address to start placing orders.</p>
            </div>
            <button
              onClick={openAddForm}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/95 transition-colors"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`bg-white p-6 rounded-xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  addr.isDefault
                    ? "border-primary/50 shadow-md bg-blue-50/10"
                    : "border-border/30 hover:border-primary/20 shadow-sm"
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span className="font-semibold text-foreground">
                      {addr.roomNo}, {addr.building}
                    </span>
                    {addr.isDefault && (
                      <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground ml-7 leading-relaxed">
                    {addr.street}, {addr.city} - {addr.pincode}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefault(addr._id)}
                      className="px-3 py-1.5 text-[12px] font-semibold text-primary hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => openEditForm(addr)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" role="dialog">
          <div className="bg-white border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {currentAddress ? "Edit Address" : "Add Address"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Provide your exact delivery coordinates.
              </p>
            </div>

            {formError && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5" role="alert">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="roomNo" className="text-sm font-semibold text-foreground">Flat / Room No</label>
                  <input
                    id="roomNo"
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="building" className="text-sm font-semibold text-foreground">Building Name</label>
                  <input
                    id="building"
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="street" className="text-sm font-semibold text-foreground">Street Name / Locality</label>
                <input
                  id="street"
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="city" className="text-sm font-semibold text-foreground">City</label>
                  <input
                    id="city"
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pincode" className="text-sm font-semibold text-foreground">Pincode</label>
                  <input
                    id="pincode"
                    type="text"
                    maxLength={6}
                    placeholder="6-digit pincode"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-border rounded-lg font-medium text-sm hover:bg-slate-100 transition-colors text-foreground cursor-pointer"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  {currentAddress ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
