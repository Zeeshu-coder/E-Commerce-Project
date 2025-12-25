import React from 'react'
import Navbar from './layout/Navbar'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CategoriesNav from './categoriesNav';


const Home = () => {
  return (
    <div>
        {/* <Navbar/> */}
        <hr className='pt-27'/>
        <CategoriesNav/>
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
