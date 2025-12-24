import React from 'react'
import Navbar from './Navbar'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const Home = () => {
  return (
    <div>
        <Navbar/>
        <hr className='pt-27'/>
        <div className=' w-full h-20 flex items-center justify-evenly'>
            <a href="/"><img src="/mobile.png" alt="" 
            className=' w-12 h-14' />
            Mobiles</a>
            <a href="/"><img src="/fashion.png" alt="" 
            className=' w-12 h-14' />
            Fashion</a>
            <a href="/"><img src="/tv.png" alt="" 
            className=' w-12 h-14' />
            Electronics</a>
            <a href="/"><img src="/laptop.png" alt="" 
            className=' w-12 h-14' />
            Laptops</a>
            <a href="/"><img src="/furniture.png" alt="" 
            className=' w-12 h-14' />
            Furniture</a>
            <a href="/"><img src="/books.png" alt="" 
            className=' w-12 h-14' />
            Books</a>
            <a href="/"><img src="/toys.png" alt="" 
            className=' w-12 h-14' />
            Toys</a>
            <a href="/"><img src="/grocery.png" alt="" 
            className=' w-12 h-14' />
            Grocery</a>
        </div>
        <hr />
        <div>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000 }}
                loop
                >
            <SwiperSlide><img src="/banner/banner1.jpg" /></SwiperSlide>
            <SwiperSlide><img src="/banner/banner2.jpg" /></SwiperSlide>
            <SwiperSlide><img src="/banner/banner3.jpg" /></SwiperSlide>
            <SwiperSlide><img src="/banner/banner4.jpg" /></SwiperSlide>
            <SwiperSlide><img src="/banner/banner5.jpg" /></SwiperSlide>
            </Swiper>

        </div>
      Home
    </div>
  )
}

export default Home
