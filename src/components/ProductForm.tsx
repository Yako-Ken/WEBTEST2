"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // 1. استيراد
import { zodResolver } from "@hookform/resolvers/zod"; // 2. استيراد
import { IFormField } from "@/types";
import DynamicForm from "./DynamicForm";
import { fetchData } from "@/app/actions/Server";
import { revalidateTags } from "@/app/actions/Revalidate";

// 3. إنشاء مخطط Zod واحد يجمع كل قواعد التحقق
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  gender: z.enum(["male", "female", "kids"]),
  price: z.coerce.number().min(0, "Price must be a positive number"), // استخدم coerce لتحويل السلسلة إلى رقم
  brand: z.string().optional(),
  images: z.array(z.object({ url: z.string(), fileId: z.string() })).min(1, "At least one image is required"),
});

// 4. استنباط نوع البيانات من المخطط
type ProductFormValues = z.infer<typeof productSchema>;
type ProductFormInput = z.input<typeof productSchema>;

export default function ProductCreatePage({
  categories,
  defaultValues,
}: {
  categories: Array<{ _id: string; name: string }>;
  defaultValues?: any; // يمكنك تحسين هذا النوع ليكون Partial<ProductFormValues> & { _id: string }
}) {
  const router = useRouter();

  // 5. إنشاء كائن form باستخدام useForm
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    // دمج القيم الافتراضية إذا كانت موجودة
    defaultValues: defaultValues || {
      name: "",
      slug: "",
      description: "",
      category: "",
      gender: "male",
      price: 0,
      brand: "",
      images: [],
    },
  });

  // 6. تعريف حقول النموذج بدون خاصية validation
  const formFields: IFormField[] = [
    { name: "name", label: "Product Name", component: "input" },
    { name: "slug", label: "Product Slug", component: "input" },
    { name: "description", label: "Description", component: "textarea" },
    {
      name: "category",
      label: "Category",
      component: "select",
      options: categories.map((c) => ({ value: c._id, label: c.name })),
    },
    {
      name: "gender",
      label: "Gender",
      component: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "kids", label: "Kids" },
      ],
    },
    { name: "price", label: "Base Price", component: "input", type: "number" },
    { name: "brand", label: "Brand", component: "input" },
    { name: "images", label: "Main Product Images", component: "photo" },
  ];

  const handleSubmit = async (values: ProductFormValues) => {
    // 7. تحويل بيانات الصور لتطابق ما يتوقعه الباك إند
    const transformedValues = {
      ...values,
      images: values.images.map(img => ({
        secure_url: img.url,
        publicId: img.fileId,
      })),
    };

    try {
      const data = await fetchData({
        resourceName: "products",
        method: defaultValues ? "PATCH" : "POST",
        body: transformedValues,
        id: defaultValues?._id,
      });
      
      if (data?.data?.doc?._id) {
        router.push(`/dashboard/product/${data.data.doc._id}/variants`);
        revalidateTags(["products", `product/${data.data.doc._id}`]);
      }
    } catch (error) {
      console.error("Failed to submit product:", error);
      // يمكنك عرض رسالة خطأ للمستخدم هنا
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* 8. تمرير كائن form إلى DynamicForm */}
      <DynamicForm
        form={form}
        onSubmit={handleSubmit}
        arrayFields={formFields}
        submitText={defaultValues ? "Update Product & Continue" : "Create Product & Continue"}
      />
    </div>
  );
}
