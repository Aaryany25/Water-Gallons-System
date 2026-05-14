
import { Route, Router, Routes } from 'react-router-dom'
// import { Home } from 'lucide-react'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import User from './pages/User'
function App() {
 

  return (
    <>
<Navbar/>
      <Routes > 
<Route path='/' element={<Home/>} />
<Route path='/SignUp' element={<Signup/>} />
<Route path='/User' element={<User/>}/>
    
      </Routes>

    </>
  )
}

export default App
