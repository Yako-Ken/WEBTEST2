"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CartModal from './CartModal';

function NavBarIcons() {
    const [profileopen,isprofileopen] = useState(false);
    const [cartopen,iscartopen] = useState(false);
    const router = useRouter();
    const login=true;
    const handleprofile =()=>{
        if(!login){
            router.push("/login");
        }
        else
        isprofileopen((prev)=>!prev)
    }
  return (
    <div className='flex items-center gap-4 xl:gap-6 relative'>
      <Image src="/profile.png" alt=""  width={22} height={22} className='cursor-pointer' onClick={handleprofile}/>
        {profileopen && (<div className='absolute p-4 rounded-md top-10 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <Link href="/">Profile</Link>
            <div className='mt-2 cursor-pointer'>LogOut</div>
            </div>)}
      <Image src="/notification.png" alt=""  width={22} height={22} className='cursor-pointer'/>
      <div className='relative cursor-pointer '  onClick={()=>iscartopen((prev)=>!prev)}>
      <Image src="/cart.png" alt=""  width={22} height={22} className='cursor-pointer'/>
      <div className='absolute -top-4 -right-4 w-6 h-6 bg-importantcolor rounded-full text-white text-sm flex items-center justify-center'>2</div>
      </div>
      {
          cartopen && (
              <CartModal/>
            )
        }
    </div>
  )
}

export default NavBarIcons
