import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import SearchBar from './SearchBar'
import NavBarIcons from './NavBarIcons'

function Navbar() {
  return (
    <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* MOBILE */}
        <div className='flex items-center justify-between h-full md:hidden'>
      <Link href='/'>
      <div className='text-2xl tracking-wide'>LOGO</div>
      </Link>
      <div className='flex items-center gap-8'>
      <NavBarIcons/>
      <Menu/>
      </div>
        </div>
        {/* BIG SCREEN */}
        <div className='hidden md:flex items-center justify-between gap-8 h-full'>
         {/* LEFT */}
         <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
        <Link href='/'>
              <div className='text-2xl tracking-wide'>LOGO</div>
        </Link>
        <div className='hidden xl:flex gap-4'>
            <Link href="/">HomePage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
        </div>
         </div>
         {/* RIGHT */}
         <div className='w-2/3 xl:w-1/2 flex items-center justify-between gap-8'>
        <SearchBar/>
        <NavBarIcons/>
         </div>
        </div>
    </div>
  )
}

export default Navbar

