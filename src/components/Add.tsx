"use client"
import React, { useState } from 'react'

function Add() {

    const [quantity,setquantity] = useState(1);

    const stock=4;

    const handlequantity = (type: "i" | "d")=>{
        if(type==="d" && quantity>1){
            setquantity(prev=>prev-1)
        }
        if(type==="i" && quantity<stock){
            setquantity(prev=>prev+1)
        }
    }

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='font-medium'>Chosse a Quantity</h4>
      <div className='flex justify-between'>
        <div className="flex items-center gap-4">
        <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button className='cursor-pointer text-xl' onClick={()=>handlequantity("d")}>-</button>
            {quantity}
            <button className='cursor-pointer text-xl' onClick={()=>handlequantity("i")}>+</button>
        </div>
        <div className="text-xs">Only <span className='text-orange-500'>4 items</span> left! <br /> {"don't"} miss it</div>
        </div>
      <button className='w-36 text-sm rounded-3xl ring-1 ring-importantcolor text-importantcolor py-2 px-4 hover:bg-importantcolor hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0'>Add to cart</button>
      </div>
    </div>
  )
}

export default Add
