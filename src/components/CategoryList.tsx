"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList() {
  return (
    <div className='px-4 overflow-x-scroll scrollbar-hide mt-8'>
      <div className="flex  gap-4 md:gap-8">
         <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name 1</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34612912/pexels-photo-34612912.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name 2</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627917/pexels-photo-34627917.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name 3</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627913/pexels-photo-34627913.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name 4</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name</h1>
         </Link>
          <Link href="/list?cat=test" className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:1/6' >
         <div className="relative bg-slate-100 w-full h-96">
            <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt='' fill sizes='20vw' className='object-cover' />
         </div>
         <h1 className='mt-8 font-light text-xl tracking-wide'>Category Name</h1>
         </Link>
      </div>
    </div>
  )
}

export default CategoryList
