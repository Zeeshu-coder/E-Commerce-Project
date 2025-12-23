import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {


  return (
    <div>
      <nav className='bg-gray-900 h-40 md:h-25 md:flex md:items-center md:justify-evenly'>
        <div className='flex items-center justify-evenly md:w-[40%]'>
        <a href='/' className='text-4xl text-center font-bold pt-3 text-white md:mb-4 '>
            ShopEase
        </a>
       <input type="text" placeholder='Search for anything' className='
        text-white border-2 border-gray-700 p-2 w-60 mb-3 mt-4 rounded-lg md:ml-6 md:w-90
        px-4 py-2 hover:border-white transition-all duration-300' />
        </div>
        <br />
      <div className='flex flex-col items-center md:flex flex-wrap-reverse md:w-[50%]'>
      <div className='w-full flex flex-row items-center justify-evenly'>
        <a href="/" className=' text-white block p-2 pr-4 pl-4 rounded-lg
        border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Home</a>
        <a href="/" className=' text-white block p-2 pr-4 pl-4 rounded-xl
        border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Cart</a>
        <a href="/" className=' text-white block p-2 pr-4 pl-4 rounded-xl
        border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Orders</a>
        <Link to="/login" className=' bg-amber-500 text-black block p-2 pr-4 pl-4 rounded-lg md:mr-2'>Login</Link>
        <Link to="/register" className='bg-amber-500 text-black block p-2 pr-4 pl-4 rounded-lg'>Signup</Link>
      </div>
      </div>
      </nav>
    </div>
  )
}

export default Navbar