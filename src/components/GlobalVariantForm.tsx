// src/app/dashboard/variants/GlobalVariantForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "./DynamicForm"; // تأكد من أن هذا المسار صحيح
import toast from "react-hot-toast";
import { fetchData } from "@/app/actions/Server";
import { revalidateTags } from "@/app/actions/Revalidate";
import { OptionsArrayField } from "./OptionsArrayField"; // سنقوم بفصل هذا المكون
import { IFormField } from "@/types";
const variantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  options: z.array(z.string().min(1, "Option value cannot be empty")).min(1, "At least one option is required"),
});

const field = (name: string, label: string, component: IFormField["component"]): IFormField => ({
  name,
  label,
  component,
});

const formConfig: IFormField[] = [
  field("name", "Variant Name", "input"),
  field("options", "Options", "array"),
];

const GlobalVariantForm = ({ defaultValues: initialData }: { defaultValues?: any }) => {
  const safeDefaultValues = {
    name: initialData?.name || "",
    options: initialData?.options && Array.isArray(initialData.options) ? initialData.options : [""],
  };

  // 1. إنشاء النموذج هنا، تمامًا كما فعلنا من قبل
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: safeDefaultValues,
  });

  const onSubmit = async (values: z.infer<typeof variantSchema>) => {
    const isEditMode = !!initialData?._id;
    const promise = fetchData({
      resourceName: "variants",
      method: isEditMode ? "PATCH" : "POST",
      body: values,
      id: initialData?._id,
    });

    await toast.promise(promise, {
      loading: isEditMode ? "Updating variant..." : "Creating variant...",
      success: (response) => {
        revalidateTags(["variants"]);
        return response?.message || `Variant ${isEditMode ? "updated" : "created"} successfully!`;
      },
      error: (err) => err.message || `Failed to ${isEditMode ? "update" : "create"} variant.`,
    });
  };

  // 2. تمرير الخصائص بالأسماء الصحيحة
  return (
    <DynamicForm
      form={form} // ‼️ الاسم الصحيح هو "form"، وليس "methods" ‼️
      onSubmit={onSubmit}
      arrayFields={formConfig} // ‼️ الاسم الصحيح هو "arrayFields"، وليس "formConfig" ‼️
      submitText={initialData?._id ? "Update Variant" : "Create Variant"}
      className="w-full flex flex-col gap-5"
    >
      {/* 3. تمرير OptionsArrayField كـ children */}
      {() => <OptionsArrayField />}
    </DynamicForm>
  );
};

export default GlobalVariantForm;
