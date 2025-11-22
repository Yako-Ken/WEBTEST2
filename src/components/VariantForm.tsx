"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { IFormField } from "@/types";
import DynamicForm from "./DynamicForm";
import { Button } from "@/app/components/ui/button";
import { Trash, Plus } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchData } from "@/app/actions/Server";
import { useState, useTransition, useEffect } from "react";
import { revalidateTags } from "@/app/actions/Revalidate";
import FormSelect from "./inputs/FormSelect";

const variantSchema = z.object({
  _id: z.string().optional(),
  options: z
    .array(
      z.object({
        name: z.string().min(1, "Option name is required"),
        value: z.string().min(1, "Option value is required"),
      })
    )
    .min(1, "At least one option is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  compareAtPrice: z.coerce.number().optional().nullable(),
  inventory: z.coerce.number().min(0, "Inventory must be a positive number"),
  images: z
    .array(
      z.object({
        url: z.string(),
        fileId: z.string(),
      })
    )
    .min(1, "At least one image is required"),
});

type VariantFormValues = z.infer<typeof variantSchema>;

const initialValues: VariantFormValues = {
  options: [{ name: "", value: "" }],
  sku: "",
  price: 0,
  compareAtPrice: null,
  inventory: 0,
  images: [],
};

interface IVariantType {
  _id: string;
  name: string;
  options: string[];
}

export default function ProductVariantPage({
  productId,
  defaultValues,
  isNew = false,
}: {
  productId: string;
  defaultValues?: any;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(isNew);
  const [isPending, startTransition] = useTransition();
  const [availableOptions, setAvailableOptions] = useState<Record<string, string[]>>({});
  const [optionTypes, setOptionTypes] = useState<{ label: string; value: string }[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  useEffect(() => {
    const getVariantTypes = async () => {
      setIsLoadingOptions(true);
      try {
        const response = await fetchData({ resourceName: "variants" });
        if (response?.data?.docs) {
          const variants: IVariantType[] = response.data.docs;
          const optionsMap: Record<string, string[]> = {};
          const types = variants.map(v => {
            optionsMap[v.name] = v.options;
            return { label: v.name, value: v.name };
          });
          setAvailableOptions(optionsMap);
          setOptionTypes(types);
        }
      } catch (error) {
        console.error("Failed to fetch variant types:", error);
      } finally {
        setIsLoadingOptions(false);
      }
    };
    getVariantTypes();
  }, []);

  if (!productId) {
    return <div className="p-4 border rounded-lg mb-4">Loading product context...</div>;
  }

  const form = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
    defaultValues: defaultValues ? {
      ...defaultValues,
      compareAtPrice: defaultValues.compareAtPrice || null,
    } : initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const watchedOptions = useWatch({
    control: form.control,
    name: "options",
  });

  const variantFields: IFormField[] = [
    { name: "sku", label: "SKU", component: "input" },
    { name: "price", label: "Price", component: "input", type: "number" },
    { name: "compareAtPrice", label: "Compare Price", component: "input", type: "number" },
    { name: "inventory", label: "Inventory", component: "input", type: "number" },
    { name: "images", label: "Variant Images", component: "photo" },
  ];

  const handleSubmit = async (values: VariantFormValues) => {
    startTransition(async () => {
      try {
        const transformedValues = {
          ...values,
          images: values.images.map((img) => ({
            secure_url: img.url,
            publicId: img.fileId,
          })),
        };

        const method = isNew ? "POST" : "PATCH";
        const resourceName = `products/${productId}/variants${isNew ? "" : `/${defaultValues._id}`}`;

        await fetchData({ resourceName, method, body: transformedValues });

        revalidateTags([`product/${productId}`]);
        router.refresh();

        if (isNew) {
          form.reset(initialValues);
        } else {
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Failed to submit variant:", error);
      }
    });
  };

  const handleDelete = async () => {
    if (isNew || !defaultValues?._id || !confirm("Are you sure you want to delete this variant?")) return;

    startTransition(async () => {
      try {
        const resourceName = `products/${productId}/variants/${defaultValues._id}`;
        await fetchData({ resourceName, method: "DELETE" });
        revalidateTags([`product/${productId}`]);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const shouldShowForm = isNew || isEditing;

  return (
    <div className="w-full h-fit overflow-y-auto mx-auto p-4 border rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{isNew ? "Add New Variant" : `Variant: ${defaultValues?.sku || ""}`}</h2>
        {!isNew && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        )}
      </div>

      {shouldShowForm && (
        <DynamicForm
          form={form}
          onSubmit={handleSubmit}
          arrayFields={variantFields}
          submitText={isNew ? "Add Variant" : "Update Variant"}
        >
          {() => (
            <>
              <h3 className="text-md font-medium mt-4 mb-2">Variant Options</h3>
              {fields.map((field, index) => {
                const selectedOptionType = watchedOptions?.[index]?.name;
                const valueOptions = selectedOptionType && availableOptions[selectedOptionType]
                  ? availableOptions[selectedOptionType].map(val => ({ label: val, value: val }))
                  : [];

                return (
                  <div key={field.id} className="flex flex-col gap-4 mb-4 p-3 border rounded-md">
                    <div className="grid grid-cols-2 gap-4 items-start">
                      <FormSelect
                        name={`options.${index}.name`}
                        control={form.control}
                        label="Option Type"
                        placeholder="Select type..."
                        options={optionTypes}
                        disabled={isLoadingOptions}
                      />
                      <FormSelect
                        name={`options.${index}.value`}
                        control={form.control}
                        label="Option Value"
                        placeholder="Select value..."
                        options={valueOptions}
                        disabled={!selectedOptionType}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="self-start">
                        Remove Option
                      </Button>
                    )}
                  </div>
                );
              })}
              <div className="flex justify-between items-center mt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", value: "" })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
                {!isNew && (
                  <Button disabled={isPending} variant="destructive" size="sm" onClick={handleDelete} className="gap-1">
                    <Trash className="h-4 w-4" />
                    Delete Variant
                  </Button>
                )}
              </div>
            </>
          )}
        </DynamicForm>
      )}
    </div>
  );
}
