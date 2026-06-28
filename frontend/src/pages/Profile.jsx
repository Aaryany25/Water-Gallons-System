import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/AuthStore'
import useAddressStore from '../store/AddressStore'

function Profile() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const getUser = useAuthStore((state) => state.getUser)
  const logout = useAuthStore((state) => state.logout)
  const updateUser = useAuthStore((state) => state.updateUser)

  const fetchAddresses = useAddressStore((state) => state.fetchAddresses)
  const defaultAddress = useAddressStore((state) => state.defaultAddress)

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editError, setEditError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const openEditModal = () => {
    setEditName(user?.name || "")
    setEditEmail(user?.email || "")
    setEditError("")
    setIsEditing(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setEditError("")
    try {
      await updateUser({ name: editName, email: editEmail })
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      setEditError(
        err.response?.data?.message || 
        err.message || 
        "Failed to update profile."
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (err) {
      console.error("Logout failed:", err)
      navigate("/login")
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-border flex justify-between items-center px-5 h-16 font-sans antialiased">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded-full active:opacity-80 active:scale-95">
            <span className="material-symbols-outlined text-blue-600">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">HydroFlow</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-[14px] font-semibold text-muted-foreground">{user?.name || 'Alex Rivers'}</span>
          <img alt="User profile photo" className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" src="https://ui-avatars.com/api/?name=User&background=0058bf&color=fff"/>
        </div>
      </header>

      <main className="pt-24 pb-32 px-5 md:px-0 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <h2 className="text-[32px] font-bold text-foreground mb-1">Profile</h2>
          <p className="text-[16px] text-muted-foreground">Manage your account and hydration preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <section className="md:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-border/20 relative">
              <button 
                onClick={openEditModal}
                className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary font-semibold text-[14px] rounded-full hover:bg-blue-100 transition-colors active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Profile
              </button>
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
                <div className="relative">
                  <img alt="Profile picture" className="w-24 h-24 rounded-full border-4 border-muted object-cover" src="https://ui-avatars.com/api/?name=User&background=0058bf&color=fff"/>
                  <div className="absolute bottom-0 right-0 bg-primary p-1 rounded-full border-2 border-white">
                    <span className="material-symbols-outlined text-white text-[16px]">verified</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-foreground">{user?.name || 'Alex Rivers'}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-[12px] font-semibold">Premium Member</span>
                    <span className="text-[12px] text-muted-foreground ml-2">Member since 2023</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <p className="text-[14px] font-semibold text-muted-foreground mb-1">Phone Number</p>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <p className="text-[16px] text-foreground">+1 (555) 012-3456</p>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-muted-foreground mb-1">Email Address</p>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    <p className="text-[16px] text-foreground">{user?.email || 'alex.rivers@example.com'}</p>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[14px] font-semibold text-muted-foreground mb-1">Primary Address</p>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                    <p className="text-[16px] text-foreground">
                      {defaultAddress 
                        ? `${defaultAddress.roomNo}, ${defaultAddress.building}, ${defaultAddress.street}, ${defaultAddress.city} - ${defaultAddress.pincode}` 
                        : "No default address set. Please add a saved address below."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link to="/profile/addresses" className="group bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-border/10 hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">home_pin</span>
                  </div>
                  <span className="material-symbols-outlined text-muted-foreground group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
                <h4 className="text-[20px] font-semibold mb-1 text-foreground">Saved Addresses</h4>
                <p className="text-[12px] text-muted-foreground">Manage saved delivery locations</p>
              </Link>
              <Link to="/profile/payments" className="group bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-border/10 hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">credit_card</span>
                  </div>
                  <span className="material-symbols-outlined text-muted-foreground group-hover:translate-x-1 transition-transform">chevron_right</span>
                </div>
                <h4 className="text-[20px] font-semibold mb-1 text-foreground">Payment Methods</h4>
                <p className="text-[12px] text-muted-foreground">Visa ending in 4242</p>
              </Link>
            </div>
          </section>

          <aside className="md:col-span-4 space-y-6">
            <div className="bg-primary p-6 rounded-xl text-primary-foreground shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-[20px] font-semibold mb-4">Current Subscription</h4>
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-[40px]">water_drop</span>
                  <div>
                    <p className="text-[18px] font-bold">Standard Hydration</p>
                    <p className="text-white/80 text-[12px] font-medium">Next Delivery: Oct 24</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-white text-primary rounded-lg text-[14px] font-semibold hover:bg-muted transition-colors">Manage Plan</button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
                <span className="material-symbols-outlined text-[160px]">opacity</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,119,255,0.06)] border border-border/10">
              <h4 className="text-[14px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">Support</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-muted rounded-lg transition-colors group">
                  <span className="material-symbols-outlined text-primary">help_outline</span>
                  <span className="text-[16px] text-foreground">Help Center</span>
                  <span className="material-symbols-outlined ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 hover:bg-destructive/10 rounded-lg transition-colors group text-destructive cursor-pointer active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span className="text-[16px] font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" role="dialog">
          <div className="bg-white border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-xl font-bold text-foreground">Edit Profile</h3>
              <p className="text-sm text-muted-foreground">Update your name and email address below.</p>
            </div>
            
            {editError && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5" role="alert">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-name" className="text-sm font-semibold text-foreground">Name</label>
                <input
                  id="edit-name"
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-email" className="text-sm font-semibold text-foreground">Email</label>
                <input
                  id="edit-email"
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-border rounded-lg font-medium text-sm hover:bg-slate-100 transition-colors disabled:opacity-50 text-foreground cursor-pointer"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/95 transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,119,255,0.06)] z-50 rounded-t-2xl font-sans text-[11px] font-medium">
        <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined mb-1">home</span>
          Home
        </Link>
        <Link to="/orders" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined mb-1">reorder</span>
          Orders
        </Link>
        <Link to="/plan" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
          <span className="material-symbols-outlined mb-1">water_drop</span>
          Plan
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 scale-90 duration-150">
          <span className="material-symbols-outlined mb-1">person</span>
          Profile
        </Link>
      </nav>
    </div>
  )
}

export default Profile
