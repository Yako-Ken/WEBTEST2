import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages/>
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae minima fuga consectetur suscipit, tempore dignissimos enim facere molestiae minus. Quo ipsa nostrum error optio eos? Autem nesciunt inventore vero ducimus.</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">E49</h3>
          <h2 className="font-medium text-2xl">E40</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts/>
        <Add/>
        <div className="h-[2px] bg-gray-100" />
          <div className="text-sm" >
            <h4 className="font-medium mb-4">Title</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut accusamus vero architecto aspernatur beatae sint possimus laborum sit error, doloremque rerum natus at velit facere dolorum? Magnam minus quia officia.</p>
          </div>
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;