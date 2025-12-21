import React from 'react'

const Navbar = () => {


  return (
    <div>
      <nav className='bg-amber-300 h-35'>
        <h1 className='text-4xl text-center font-bold pt-3'>
        Electronics Store
      </h1>
      <br />
      <div className='flex flex-col items-center'>
        <input type="text" placeholder='Search for anything' className='border-2 border-gray-700 p-2 w-80 mb-3' />
      <div className=' '>
        <a href="/">Home</a>
        <a href="/">Cart</a>
        <a href="/">Orders</a>
        <a href="/">Login</a>
        <a href="/">Signup</a>
      </div>
      </div>
      </nav>
    </div>
  )
}

export default Navbar


