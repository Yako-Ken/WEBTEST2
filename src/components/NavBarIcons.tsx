"use client";

import Image from 'next/image';
import { useState } from 'react';
import CartModal from './CartModal';
import User from './User';
import { useAuth } from '@/app/context/AuthProvider';
import { useCartStore } from '@/app/hooks/useCartStore';

function NavBarIcons() {
  const [cartopen, iscartopen] = useState(false);
  const { auth } = useAuth();
  const user = auth?.user;
  const { totalItems } = useCartStore();

  return (
    <div className='flex items-center gap-4 xl:gap-6 relative'>
      <User user={user} />
      <div className='relative cursor-pointer' onClick={() => iscartopen((prev) => !prev)}>
        <Image src="/cart.png" alt="" width={22} height={22} className='cursor-pointer' />
        <div className='absolute -top-4 -right-4 w-6 h-6 bg-importantcolor rounded-full text-white text-sm flex items-center justify-center'>
          {totalItems}
        </div>
      </div>
      {cartopen && (
        <CartModal />
      )}
    </div>
  );
}

export default NavBarIcons;
