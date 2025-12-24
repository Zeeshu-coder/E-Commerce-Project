import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {


  return (
    <div>
      <nav className='h-40 md:h-25 md:flex md:items-center md:justify-evenly
      fixed top-0 left-0 w-full z-50 bg-white shadow'>
        <div className='flex items-center justify-evenly md:w-[40%]'>
        <a href='/' className='text-4xl text-center font-bold pt-3 text-blue-600 md:mb-4 '>
            ShopEase
        </a>
       <input type="search" placeholder='Search for anything' className='
        text-black border-2 border-gray-700 p-2 w-60 mb-3 mt-4 rounded-lg md:ml-6 md:w-90
        px-4 py-2 hover:border-black transition-all duration-300' />
        </div>
        <br />
      <div className='flex flex-col items-center md:flex flex-wrap-reverse md:w-[50%]'>
      <div className='w-full flex flex-row items-center justify-evenly'>
        <a href="/" className=' text-blue-600 block p-2 pr-4 pl-4 rounded-lg text-lg
        border border-transparent px-4 py-2 hover:border-black transition-all duration-300'>Home</a>
        <a href="/" className=' text-blue-600 block p-2 pr-4 pl-4 rounded-xl text-lg
        border border-transparent px-4 py-2 hover:border-black transition-all duration-300'>Cart</a>
        <a href="/" className=' text-blue-600 block p-2 pr-4 pl-4 rounded-xl text-lg
        border border-transparent px-4 py-2 hover:border-black transition-all duration-300'>Orders</a>
        <Link to="/login" className=' bg-blue-600 text-white block p-2 pr-4 pl-4 rounded-lg md:mr-2'>Login</Link>
        <Link to="/register" className='bg-blue-600 text-white block p-2 pr-4 pl-4 rounded-lg'>Signup</Link>
      </div>
      </div>
      </nav>
    </div>
  )
}

export default Navbar