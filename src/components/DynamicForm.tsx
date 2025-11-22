"use client";
import { IFormField } from "@/types";
import React, { useState, useTransition } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../app/components/ui/form";
import { PhotoInput } from "../app/inputs/PhotoInput";
import FormSelect from "../app/inputs/FormSelect";
import FormInput from "../app/inputs/FormInput";
import { Button } from "../app/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TDynamicForm {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<any>;
  arrayFields: IFormField[];
  submitText: string;
  className?: string;
  children?: (control: any, getValues: any) => React.ReactNode;
}

const DynamicForm = ({ form, onSubmit, arrayFields, submitText, className, children }: TDynamicForm) => {
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = (values: z.infer<any>) => {
    startTransition(async () => {
      setError(undefined);
      try {
        const res = await onSubmit(values);
        if (res?.status === "success") {
          toast({
            title: "Success",
            description: res?.message || "Operation successful",
          });
        }
      } catch (err: any) {
        console.error("Form submission error:", err);
        setError(err?.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        {arrayFields?.map((field) => {
          switch (field.component) {
            case "select":
              return (
                <FormSelect
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  options={field.options || []}
                  className={field.className}
                  {...field.props}
                />
              );
            case "checkbox":
            case "array":
              return null;
            case "textarea":
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  area={true}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );
            case "photo":
              type PhotoValue = { url: string; fileId: string; }[] | undefined;
              return (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: renderField }) => (
                    <FormItem>
                      {field.label && <FormLabel>{field.label}</FormLabel>}
                      <FormControl>
                        <PhotoInput
                          value={renderField.value as PhotoValue}
                          onValueChange={renderField.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            default:
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  description={field.description}
                  className={field.className}
                  password={field.password}
                  {...field.props}
                />
              );
          }
        })}
        {children && children(form.control, form.getValues)}
        {error && <p className="font-semibold text-red-500 my-3">{error}</p>}
        <Button type="submit" disabled={isPending}>{submitText}</Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
