import React from 'react'
import {Link} from "react-router-dom"
import { CookingPot } from 'lucide-react';

function Navbar() {
  return (
    <div>

       <nav className='flex justify-between items-center px-8 py-4 bg-white shadow-md'>
        <h1 className='text-2xl font-serif text-gray-800'>SmartChef< CookingPot size={20}/></h1>
        <div className='space-x-4'>
          <Link className='text-blue-600 font-semibold' to="/">Home</Link>
          <Link className='text-blue-600 font-semibold' to="/discover">Discover</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar