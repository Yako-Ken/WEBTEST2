"use client";

import { useEffect, useState } from "react";

interface Variant {
  _id: string;
  options: { name: string; value: string }[];
  inventory: number;
  price: number;
}

interface CustomizeProductsProps {
  variants: Variant[];
  onVariantSelect: (variant: Variant | null | undefined) => void;
}

export default function CustomizeProducts({ variants, onVariantSelect }: CustomizeProductsProps) {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const uniqueOptions = variants.reduce((acc, variant) => {
    variant.options.forEach(option => {
      if (!acc[option.name]) {
        acc[option.name] = new Set<string>();
      }
      acc[option.name].add(option.value);
    });
    return acc;
  }, {} as { [key: string]: Set<string> });

  const optionNames = Object.keys(uniqueOptions);

  useEffect(() => {
    if (Object.keys(selectedOptions).length === optionNames.length) {
      const foundVariant = variants.find(variant =>
        variant.options.every(
          opt => selectedOptions[opt.name] === opt.value
        )
      );
      onVariantSelect(foundVariant || null);
    } else {
      onVariantSelect(undefined);
    }
  }, [selectedOptions, variants, optionNames, onVariantSelect]);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {optionNames.map(name => (
        <div className="flex flex-col gap-4" key={name}>
          <h4 className="font-medium">Choose a {name}</h4>
          <ul className="flex items-center gap-3">
            {Array.from(uniqueOptions[name]).map(value => {
              const isSelected = selectedOptions[name] === value;
              const isColor = name.toLowerCase() === 'color';

              if (isColor) {
                return (
                  <li
                    key={value}
                    className={`w-6 h-6 rounded-full ring-1 ring-gray-300 cursor-pointer relative ${isSelected ? 'ring-2 ring-importantcolor' : ''}`}
                    style={{ backgroundColor: value.toLowerCase() }}
                    onClick={() => handleOptionSelect(name, value)}
                  >
                    {isSelected && (
                      <div className="absolute w-8 h-8 rounded-full ring-2 ring-importantcolor top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </li>
                );
              }

              return (
                <li
                  key={value}
                  className={`ring-1 ring-gray-300 rounded-md py-1 px-4 text-sm cursor-pointer transition-all
                    ${isSelected 
                      ? "ring-2 ring-importantcolor text-white bg-importantcolor" 
                      : "text-gray-500 hover:bg-gray-100"
                    }
                  `}
                  onClick={() => handleOptionSelect(name, value)}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
