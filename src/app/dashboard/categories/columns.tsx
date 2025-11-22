"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types";
import { Button } from "@/app/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import ModalCustom from "@/components/defaults/ModalCustom";
import CategoryEditForm from "./CategoryEditForm";
import { revalidateTags } from "@/app/actions/Revalidate";
import { fetchData } from "@/app/actions/Server";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image"; // <-- 1. استيراد مكون الصورة من Next.js

// دالة الحذف (تبقى كما هي)
const handleDelete = async (categoryId: string, router: any) => {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    await fetchData({ resourceName: `categories/${categoryId}`, method: "DELETE" });
    toast.success("Category deleted successfully!");
    revalidateTags(["categories"]);
    router.refresh();
  } catch (error: any) {
    toast.error(error.message || "Failed to delete category.");
  }
};

export const columns: ColumnDef<Category>[] = [
  // --- 2. إضافة عمود الصورة الجديد ---
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.image;
      console.log(row.original,"hfj");
      return (
        <div className="w-16 h-16 relative">
          {image?.secure_url ? (
            <Image
              src={image.secure_url}
              alt={row.original.name}
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
              No Image
            </div>
          )}
        </div>
      );
    },
  },
  // ------------------------------------

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const router = useRouter();

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              <ModalCustom
                title={`Edit Category: ${category.name}`}
                description="Make changes to the category details below."
                content={<CategoryEditForm category={category} />}
                btn={
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground w-full">
                    Edit
                  </div>
                }
                isMenuItem={true}
              />

              <DropdownMenuItem onClick={() => handleDelete(category._id, router)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
