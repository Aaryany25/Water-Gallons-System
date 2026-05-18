
import React, { useEffect } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
// import { Home } from 'lucide-react'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import User from './pages/User'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
// import useAuthStore from './store/AuthStore'

function App() {
  // const { alluser } = useAuthStore();

  // useEffect(() => {
  //   alluser();
  // }, [alluser]);

  return (
    <>
<Navbar/>
      <Routes > 
<Route path='/' element={<Home/>} />
<Route path='/signup' element={
  <GuestRoute>
    <Signup/>
  </GuestRoute>
} />
<Route path='/user' element={
  // <ProtectedRoute>
    <User/>
  // </ProtectedRoute>
}/>
<Route path='/login' element={
  // <GuestRoute>
    <Login/>
  // </GuestRoute>
}/>

      </Routes>

    </>
  )
}

export default App
