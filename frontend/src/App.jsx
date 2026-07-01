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
import useAuthStore from './store/AuthStore'
import AdminRoute from './components/AdminRoute'

function App() {
  const getUser = useAuthStore((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <Navbar />
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
      </Routes>
    </>
  )
}

export default App
