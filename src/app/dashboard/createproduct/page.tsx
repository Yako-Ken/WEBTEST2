import { fetchData } from "@/app/actions/Server";
import ProductCreatePage from "../../../components/ProductForm";

export const dynamic = 'force-dynamic';

export default async function CreateProductPage() {
  let categoriesDocs = [];

  try {
    const { data: categories } = await fetchData({
      resourceName: "categories",
      tags: ["categories"],
    });
    
    if (categories && categories.docs) {
      categoriesDocs = categories.docs;
    }
  } catch (error) {
    console.error("Failed to fetch categories during build:", error);
  }

  return (
    <div className=" w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <ProductCreatePage categories={categoriesDocs} />
    </div>
  );
}
