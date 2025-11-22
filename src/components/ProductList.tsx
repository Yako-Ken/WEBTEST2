import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/app/actions/Server";

function ProductList() {
  return (
    <div className='mt-12 mb-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614530/pexels-photo-32614530.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627919/pexels-photo-34627919.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name1</span>
        <span className='font-semibold'>E49</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
       <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614532/pexels-photo-32614532.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627916/pexels-photo-34627916.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name2</span>
        <span className='font-semibold'>E364</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
       <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614534/pexels-photo-32614534.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627923/pexels-photo-34627923.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name3</span>
        <span className='font-semibold'>E492</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
       <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
      <div className="relative w-full h-80">
        <Image src="https://images.pexels.com/photos/32614536/pexels-photo-32614536.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
        <Image src="https://images.pexels.com/photos/34627925/pexels-photo-34627925.jpeg" alt="" fill sizes='25vw' className='absolute object-cover rounded-md' />
      </div>
      <div className="flex justify-between">
        <span className='font-medium'>Product Name4</span>
        <span className='font-semibold'>E949</span>
      </div>
      <div className="text-sm text-gray-500">My description</div>
      <button className='rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white'>Add To Cart</button>
      </Link>
    </div>
  )
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

const ProductList = async () => {
  const productsResponse = await fetchData({
    resourceName: "products",
    tags: ["products"],
  });

  const products: Product[] = productsResponse?.data?.docs || [];

  return (
    <div className="mt-12 mb-12 flex gap-x-8 gap-y-16 justify-start flex-wrap">
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          className="w-[45%] flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.images[0]?.secure_url || "/placeholder.png"}
              alt={product.name}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in-out duration-500"
            />
            <Image
              src={product.images[1]?.secure_url || product.images[0]?.secure_url || "/placeholder.png"}
              alt={product.name}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          <p className="text-sm text-gray-500 h-10 overflow-hidden">
            {truncateText(product.description, 60)}
          </p>
          <button className="rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white self-start mt-auto">
            Add To Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
