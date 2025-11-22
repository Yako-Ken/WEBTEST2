// src/app/page.tsx

import Categories from '@/components/Categories'; // <-- 1. استيراد المكون الصحيح
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import React from 'react';

function HomePage() {
  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList />
      </div>
      <div className="mt-24">
        <h1 className="text-2xl ms-4 lg:ms-64">Categories</h1>
        <Categories /> {/* <-- 2. استخدام المكون الصحيح هنا */}
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <ProductList />
      </div>
    </div>
  );
}

export default HomePage;
