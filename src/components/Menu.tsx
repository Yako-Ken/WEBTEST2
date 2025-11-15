"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

function Menu() {
    const [open,isopen]= useState(false);
  return (
    <div className='z-50'>
      <Image src='/menu.png' width={28} height={28} className='cursor-pointer' alt='' onClick={()=>isopen((prev)=>!prev)}/>{
        open && <div className='absolute left-0 top-20  text-white bg-gray-700 w-full h-[calc(100vh-80px)] flex flex-col items-center gap-8 justify-center text-xl'>
            <Link href="/">HomePage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Logout</Link>
            <Link href="/">Cart(1)</Link>
        </div>
      }
    </div>
  )
}

export default Menu
