import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // useEffect removed as state is initialized directly

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
    window.location.reload();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    }
  };

  return (
    <div>
      <nav className='bg-gray-900 h-40 md:h-25 md:flex md:items-center md:justify-evenly'>
        <div className='flex items-center justify-evenly md:w-[40%]'>
        <a href='/' className='text-4xl text-center font-bold pt-3 text-white md:mb-4 '>
            ShopEase
        </a>
       <input 
        type="text" 
        placeholder='Search for anything' 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        className='
        text-white border-2 border-gray-700 p-2 w-60 mb-3 mt-4 rounded-lg md:ml-6 md:w-90
        px-4 py-2 hover:border-white transition-all duration-300' />
        </div>
        <br />
      <div className='flex flex-col items-center md:flex flex-wrap-reverse md:w-[50%]'>
      <div className='w-full flex flex-row items-center justify-evenly'>
        <Link to="/" className=' text-white block p-2 pr-4 pl-4 rounded-lg
        border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Home</Link>
        <Link to="/cart" className=' text-white block p-2 pr-4 pl-4 rounded-xl
        border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Cart</Link>
        {currentUser && (
            <>
                <Link to="/wishlist" className=' text-white block p-2 pr-4 pl-4 rounded-xl
                border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Wishlist</Link>
                <Link to="/orders" className=' text-white block p-2 pr-4 pl-4 rounded-xl
                border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Orders</Link>
            </>
        )}
        
        {currentUser && (
            <Link to="/profile" className=' text-white block p-2 pr-4 pl-4 rounded-xl
            border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Profile</Link>
        )}

        {currentUser && currentUser.role === 'ADMIN' && (
            <>
                <Link to="/admin" className=' text-white block p-2 pr-4 pl-4 rounded-xl
                border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Dashboard</Link>
                <Link to="/add-product" className=' text-white block p-2 pr-4 pl-4 rounded-xl
                border border-transparent px-4 py-2 hover:border-white transition-all duration-300'>Add Product</Link>
            </>
        )}
        
        {currentUser ? (
            <button onClick={logOut} className=' bg-red-500 text-white block p-2 pr-4 pl-4 rounded-lg md:mr-2'>Logout</button>
        ) : (
            <>
                <Link to="/login" className=' bg-amber-500 text-black block p-2 pr-4 pl-4 rounded-lg md:mr-2'>Login</Link>
                <Link to="/register" className='bg-amber-500 text-black block p-2 pr-4 pl-4 rounded-lg'>Signup</Link>
            </>
        )}
      </div>
      </div>
      </nav>
    </div>
  )
}

export default Navbar