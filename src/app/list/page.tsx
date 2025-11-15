import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import Image from 'next/image'
import React from 'react'

function ListPage() {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* CAMPAIGN */}
      <div className="bg-pink-50 px- flex justify-between h-32 sm:h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-3 sm:gap-8">
        <h1 className='sm:text-4xl text-md font-semibold sm:leading-[48px] text-gray-700'>Grab up to 50% off on <br/> Selexted Products</h1>
        <button className='rounded-3xl bg-importantcolor text-white text-sm w-max py-3 px-5'>Buy Now</button>
        </div>
        <div className="relative w-1/3">
            <Image src="/woman.png" alt='' fill className='object-contain' />
        </div>
      </div>
      {/* FILTER */}
      <Filter/>
      {/* PRODUCT */}
      <h1 className='text-xl font-semibold mt-10'>Shose For You!</h1>
      <ProductList/>
    </div>
  )
}

export default ListPage
