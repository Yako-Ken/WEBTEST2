// src/app/dashboard/variants/OptionsArrayField.tsx
"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import FormInput from "@/app/inputs/FormInput"; // ‼️ تأكد من أن هذا المسار صحيح ‼️

// هذا المكون لم يعد يستلم أي props، لأنه سيستخدم السياق مباشرة
export const OptionsArrayField = () => {
  // 1. استخدم useFormContext للوصول إلى control
  const { control } = useFormContext(); 
  
  // 2. useFieldArray الآن يعمل بشكل صحيح لأنه داخل FormProvider
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Options</label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            {/* FormInput سيستخدم السياق أيضًا */}
            <FormInput name={`options.${index}`} label="" placeholder="Option value (e.g., Red, XL)" />
            {fields.length > 1 && (
              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
        Add Option
      </Button>
    </div>
  );
};
