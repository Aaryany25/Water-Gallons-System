import { GlassWater } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function Navbar() {
  return (
    <div className='flex items-enter justify-between py-5 max-w-7xl mx-auto'>
        <div>
            <GlassWater/>
        </div>
        <div className='flex gap-5'>

        <Link to="/">Home</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/user">ALL</Link>
        </div>
        <Button >
        <Link to="/signup">SignUp</Link>
            </Button>

    </div>
  )
}

export default Navbar