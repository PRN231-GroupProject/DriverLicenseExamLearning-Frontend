'use client'
import Image from 'next/image';
import React from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img2 from "../../../public/banner-2.jpg"

export default function Carousel() {
  return (
    <div className='flex w-full justify-center items-center'>
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop={true}
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        >
            <SwiperSlide>
                <div className=' flex justify-center items-center'>
                    <Image src={img2} alt="kda" className="h-3/4 w-3/4" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' flex justify-center items-center'>
                    <Image src={img2} alt="kda" className="h-3/4 w-3/4" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' flex justify-center items-center'>
                    <Image src={img2} alt="kda" className="h-3/4 w-3/4" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' flex justify-center items-center'>
                    <Image src={img2} alt="kda" className="h-3/4 w-3/4" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' flex justify-center items-center'>
                    <Image src={img2} alt="kda" className="h-3/4 w-3/4" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' flex justify-center items-center'>
                    <Image src={img2} alt="kda" className="h-3/4 w-3/4" />
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}
