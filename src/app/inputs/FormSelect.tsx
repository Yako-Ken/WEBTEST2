"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

/* ---------- Type definitions ---------- */
interface Option {
  _id?: string;
  name?: string;
  label?: string;
  value?: string;
}

type FormSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  id?: string;
  options?: Option[];
  selected?: string[];
  className?: string;
  optional?: boolean;
};

/* ---------- Component ---------- */
const FormSelect = ({
  name,
  label,
  placeholder,
  description,
  id,
  options,
  selected,
  className,
  optional,
}: FormSelectProps) => {
  const form = useFormContext();
  const selectedValue = form.watch(name);

  /* filter-out already-selected options */
  const filteredOptions = options?.filter(
    (p) => !selected?.includes(p._id ?? p.value ?? "")
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = options?.find(
          (p) =>
            p._id === form.getValues(name)?._id ||
            p._id === selectedValue ||
            p.value === selectedValue
        );

        return (
          <FormItem
            className={`${className || ""} relative w-full`}
            id={id || ""}
          >
            <FormLabel className="relative w-fit capitalize">
              {!optional && (
                <span className="absolute -right-5 -top-[1px] z-10 font-normal text-red-600">
                  *
                </span>
              )}
              {label}
            </FormLabel>

            <Select
              onValueChange={field.onChange}
              defaultValue={field.value ?? ""}
            >
              <FormControl>
                <SelectTrigger className="capitalize shadow-sm">
                  <SelectValue placeholder={placeholder || "SELECT"}>
                    {selected?.name || selected?.label || placeholder}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {filteredOptions
                  ?.filter((opt) => opt !== form.getValues(name))
                  .map((opt, i) => (
                    <SelectItem
                      className="capitalize"
                      key={`${i}-${opt.label}-${opt.value}`}
                      value={opt._id ?? opt.value ?? String(opt)}
                    >
                      {opt.label ?? opt.name ?? String(opt)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormSelect;