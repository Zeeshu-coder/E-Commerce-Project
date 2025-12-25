import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Navbar = () => {


  return (
    <div>
      <nav className='h-40 md:h-25 md:flex md:items-center md:justify-evenly
      fixed top-0 left-0 w-full z-50 bg-white shadow'>
        <div className='flex items-center justify-evenly md:w-[40%]'>
        <a href='/' className='text-4xl text-center font-bold pt-3 text-blue-600 md:mb-4 '>
            ShopEase
        </a>
       <div>
        <input type="search" placeholder='Search for anything' className='
        text-black border-2 border-gray-700 p-2 w-60 mb-3 mt-4 rounded-lg md:ml-6 md:w-90
        px-4 py-2 hover:border-black transition-all duration-300' />
        {/* <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
        />
      </svg> */}
       </div>
        </div>
        <br />
      <div className='flex flex-col items-center md:flex flex-wrap-reverse md:w-[50%]'>
      <div className='w-full flex flex-row items-center justify-evenly'>
        <a href="/" className=' text-blue-600 block p-2 pr-4 pl-4 rounded-lg text-lg
        border border-transparent px-4 py-2 hover:border-black transition-all duration-300'>Home</a>
        <a href="/cart" className=' text-blue-600 block p-2 pr-4 pl-4 rounded-xl text-lg
        border border-transparent px-4 py-2 hover:border-black transition-all duration-300'>Cart</a>
        <a href="/" className=' text-blue-600 block p-2 pr-4 pl-4 rounded-xl text-lg
        border border-transparent px-4 py-2 hover:border-black transition-all duration-300'>Orders</a>
        <Link to="/login" className=' bg-blue-600 text-white block p-2 pr-4 pl-4 rounded-lg md:mr-2'>Login</Link>
        <Link to="/register" className='bg-blue-600 text-white block p-2 pr-4 pl-4 rounded-lg'>Register</Link>
      </div>
      </div>
      </nav>
    </div>
  )
}

export default Navbar