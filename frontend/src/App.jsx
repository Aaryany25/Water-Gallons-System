import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import PlaceOrder from './pages/PlaceOrder'
import UserOrders from './pages/UserOrders'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Addresses from './pages/Addresses'
import AdminStats from './pages/AdminStats'
import OrderDetails from './pages/OrderDetails'
import useAuthStore from './store/AuthStore'
import AdminRoute from './components/AdminRoute'
import Toaster from './components/Toaster'
import useToastStore from './store/ToastStore'
import useOrderStore from './store/OrderStore'
import { getOrders } from './api/Orderapi'

function App() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    getUser();
  }, [getUser]);

  // Background polling for order status changes (only for regular users)
  useEffect(() => {
    if (!isAuthenticated || !user || user.role === 'admin') return;

    // Fetch initial user orders
    useOrderStore.getState().fetchUserOrders();

    const interval = setInterval(async () => {
      try {
        const prevOrders = useOrderStore.getState().orders;
        const response = await getOrders();
        const nextOrders = response.data || [];

        // Check if any order status has changed
        nextOrders.forEach((newOrder) => {
          const oldOrder = prevOrders.find((o) => o._id === newOrder._id);
          if (oldOrder && oldOrder.status !== newOrder.status) {
            useToastStore.getState().addToast(
              `Order #${newOrder._id.slice(-6).toUpperCase()} status updated: ${newOrder.status.toUpperCase()}`,
              newOrder.status === "cancelled" ? "error" : newOrder.status === "delivered" ? "success" : "info"
            );
          }
        });

        // Sync order store status
        useOrderStore.setState({ orders: nextOrders });
      } catch (err) {
        console.error("Error polling order status:", err);
      }
    }, 6000); // Check every 6 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        } />
        <Route path='/login' element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path='/user' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/place-order' element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        } />
        <Route path='/orders' element={
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        } />
        <Route path='/orders/:orderId' element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/profile/addresses' element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
        <Route path='/admin/stats' element={
          <AdminRoute>
            <AdminStats />
          </AdminRoute>
        } />
      </Routes>
    </>
  )
}

export default App
