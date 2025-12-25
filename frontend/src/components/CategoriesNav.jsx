import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesNav = () => {
  return (
    <div>
      <div className=' w-full h-20 flex items-center justify-evenly'>
            <Link to="/"><img src="/mobile.png" alt="" 
            className=' w-12 h-12' />
            Mobiles</Link>
            <Link to="/"><img src="/fashion.png" alt="" 
            className=' w-12 h-12' />
            Fashion</Link>
            <Link to="/"><img src="/tv.png" alt="" 
            className=' w-12 h-12' />
            Electronics</Link>
            <Link to="/"><img src="/laptop.png" alt="" 
            className=' w-12 h-12' />
            Laptops</Link>
            <Link to="/"><img src="/furniture.png" alt="" 
            className=' w-12 h-12' />
            Furniture</Link>
            <Link to="/"><img src="/books.png" alt="" 
            className=' w-12 h-12' />
            Books</Link>
            <Link to="/"><img src="/toys.png" alt="" 
            className=' w-12 h-12' />
            Toys</Link>
            <Link to="/"><img src="/grocery.png" alt="" 
            className=' w-12 h-12' />
            Grocery</Link>
        </div>
        <hr />
    </div>
  )
}

export default CategoriesNav
