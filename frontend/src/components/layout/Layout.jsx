import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='grow'>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
