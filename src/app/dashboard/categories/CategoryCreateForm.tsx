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
import { revalidateTags } from "@/app/actions/Revalidate";

const postWithImage = async ({ resourceName, formData }: { resourceName: string, formData: FormData }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${resourceName}`, {
    method: "POST",
    body: formData,
  } );
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Request failed");
  }
  return res.json();
};

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters long."),
  image: z.any().refine(files => files?.length >= 1, "Image is required.").optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CategoryCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return postWithImage({ resourceName: "categories", formData });
    },
    onSuccess: () => {
      toast.success("Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      revalidateTags(["categories"]);
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create category.");
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
    <div className="p-6 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Summer Collection" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryCreateForm;
