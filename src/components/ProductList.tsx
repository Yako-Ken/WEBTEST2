import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProductList() {
  return (
    <div className='mt-12 mb-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614530/pexels-photo-32614530.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name</span>
        <span className='font-semibold'>E49</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
       <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614530/pexels-photo-32614530.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name</span>
        <span className='font-semibold'>E49</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
       <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614530/pexels-photo-32614530.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name</span>
        <span className='font-semibold'>E49</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
       <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614530/pexels-photo-32614530.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name</span>
        <span className='font-semibold'>E49</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
    </div>
  )
}

export default ProductList
