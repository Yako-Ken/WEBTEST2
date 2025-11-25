"use client";

import Image from 'next/image';
import React from 'react';
import { useCartStore } from '@/app/hooks/useCartStore';
import Link from 'next/link';
import { useHydratedCart } from '@/app/hooks/useHydratedCart'; // <-- (1) استيراد الـ Hook الجديد

function CartModal() {
  const { items, totalPrice, removeItem } = useCartStore();
  const { isHydrated } = useHydratedCart(); // <-- (2) استخدام الـ Hook الجديد

  // (3) الشرط الأهم: لا تعرض أي شيء حتى يتم تحميل البيانات
  if (!isHydrated) {
    return null; 
  }

  return (
    <div className='w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20'>
      {items.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {items.map(item => (
              <div className='flex gap-4' key={item.variantId || item.productId}>
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={72}
                  height={96}
                  className='object-cover rounded-md'
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className='font-semibold'>{item.name}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm">${item.price}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      available
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className='text-gray-500'>Qty. {item.quantity}</span>
                    <span
                      className='text-blue-500 cursor-pointer'
                      onClick={() => removeItem(item.productId, item.variantId)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className='text-gray-500 text-sm mt-2 mb-4'>Shipping and taxes calculated at Checkout</p>
            <div className="flex justify-between text-sm">
              <Link href={"/cart"} className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</Link>
              <button className="rounded-md py-3 px-4 bg-black text-white">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartModal;
