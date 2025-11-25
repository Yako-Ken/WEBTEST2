import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/app/actions/Server";
import { IProduct } from "@/types";

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

  const products: IProduct[] = productsResponse?.data?.docs || [];

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
