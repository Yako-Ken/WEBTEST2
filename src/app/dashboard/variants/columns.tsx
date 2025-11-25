"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IVariant } from "@/types";
import ModalCustom from "../../../components/defaults/ModalCustom";
import { Button } from "../../../app/components/ui/button";
import GlobalVariantForm from "../../../components/GlobalVariantForm";

export const variantColumns: ColumnDef<IVariant>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => {
      // التحقق من وجود مصفوفة options
      const options = row.original.options;
      if (!options || !Array.isArray(options) || options.length === 0) {
        return <span>No options</span>; // عرض نص بديل آمن
      }

      return (
        <ModalCustom
          content={
            <ul className="flex flex-col list-disc pl-5">
              {options.map((option, idx) => {
                // التحقق من وجود مصفوفة values لكل option
                const values = option.values;
                const displayValues =
                  values && Array.isArray(values) ? values.join(", ") : "N/A";

                return (
                  <li key={idx}>
                    {option.name}: {displayValues}
                  </li>
                );
              })}
            </ul>
          }
          btn={<Button>Open</Button>}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ModalCustom
        btn={
          <div className="w-fit flex flex-col">
            <Button variant={"ghost"}>Update</Button>
          </div>
        }
        content={<GlobalVariantForm defaultValues={row.original} />}
      />
    ),
  },
];
