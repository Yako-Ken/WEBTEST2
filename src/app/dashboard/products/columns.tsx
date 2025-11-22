"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  brand: string;
  isActive: boolean;
  totalInventory: number;
  images: {
    secure_url: string;
  }[];
  category: {
    name: string;
  };
}

const ActionsCell = ({ product }: { product: Product }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      startTransition(async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`, {
            method: "DELETE",
          });
          router.refresh();
        } catch (error) {
          console.error("Delete error:", error);
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/product/${product._id}/edit`}>Edit Product</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/product/${product._id}/variants`}>Manage Variants</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          {isPending ? "Deleting..." : "Delete Product"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.getValue("images") as Product["images"];
      const imageUrl = images?.[0]?.secure_url || "/placeholder.png";
      return (
        <div className="relative h-12 w-12">
          <Image
            src={imageUrl}
            alt={row.original.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price")) || 0;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EGP",
      }).format(price);
      return formatted;
    },
  },
  {
    accessorKey: "totalInventory",
    header: "Stock",
    cell: ({ row }) => {
      const stock = Number(row.getValue("totalInventory")) || 0;
      return (
        <div className={`text-center font-medium ${stock <= 0 ? "text-red-500" : ""}`}>
          {stock}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return <ActionsCell product={product} />;
    },
  },
];
