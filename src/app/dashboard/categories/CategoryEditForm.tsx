"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/app/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "@/types";
import Image from "next/image";
import { revalidateTags } from "@/app/actions/Revalidate";

const patchWithImage = async ({ resourceName, formData }: { resourceName: string, formData: FormData }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${resourceName}`, {
    method: "PATCH",
    body: formData,
  } );
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Request failed");
  }
  return res.json();
};

const categorySchema = z.object({
  name: z.string().min(2, "Category name is required."),
  image: z.any().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryEditFormProps {
  category: Category;
}

const CategoryEditForm = ({ category }: CategoryEditFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return patchWithImage({ resourceName: `categories/${category._id}`, formData });
    },
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      revalidateTags(["categories"]);
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update category.");
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    mutation.mutate(formData);
  };

  return (
    <div className="p-4 bg-white">
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Electronics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Category Image</FormLabel>
            {category.image?.secure_url && (
              <div className="my-2">
                <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                <Image
                  src={category.image.secure_url}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...rest}
                    onChange={(e) => {
                      onChange(e.target.files);
                    }}
                  />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Updating..." : "Update Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryEditForm;
