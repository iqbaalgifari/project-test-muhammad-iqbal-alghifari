"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function BannerComponent() {

  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className='w-full h-screen relative overflow-hidden'>
        {/* Parallax bg */}
        <Image
          src={"/ideas.jpg"}
          fill
          className='absolute object-cover z-0 w-full brightness-50 h-full bg-gray-700 transition-transform duration-300'
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        />
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute w-full z-10 -bottom-[0.5px]'>
          <path fill="#ffffff" fill-opacity="1" d="M0,320L1440,128L1440,320L0,320Z"></path>
        </svg> */}
        {/* Parallax cta */}
        <div
          style={{ transform: `translateY(-${offsetY * 1}px)` }} 
          className='absolute w-full h-full z-20 flex flex-col justify-center items-center gap-y-1 text-white'
        >
          <h1 className='text-6xl'>Ideas</h1>
          <p className='text-xl'>Where all our great things begin</p>
        </div>
      </div>
    </>
  )
}
