"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/app/hooks/useCartStore";
import toast from "react-hot-toast";

const Add = ({
  productId,
  productName,
  productPrice,
  productImage,
  variants,
}: {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  variants: any[];
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const hasVariants = variants && variants.length > 0;

  useEffect(() => {
    if (hasVariants) {
      setSelectedVariant(variants[0]);
    }
  }, [variants, hasVariants]);

  const { addItem } = useCartStore();

  const stock = selectedVariant?.inventory ?? (hasVariants ? 0 : 1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) {
      toast.error("Please select a product option.");
      return;
    }
    if (stock < 1 && hasVariants) {
      toast.error("This item is out of stock.");
      return;
    }

    const cartItemName =
      hasVariants && selectedVariant?.color
        ? `${productName} (${selectedVariant.color})`
        : productName;

    const itemToAdd = {
      productId: productId,
      variantId: selectedVariant?._id,
      name: cartItemName,
      image: selectedVariant?.images?.[0]?.secure_url || productImage,
      price: selectedVariant?.price || productPrice,
      quantity: quantity,
    };

    addItem(itemToAdd);
    toast.success(`${quantity} x "${productName}" added to cart!`);
  };

  return (
    <div className="flex flex-col gap-4">
      {hasVariants && (
        <>
          <h4 className="font-medium">Choose a Color</h4>
          <ul className="flex items-center gap-3">
            {variants.map((variant) => (
              <li
                key={variant._id} // المفتاح موجود هنا وهو صحيح
                className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative flex items-center justify-center"
                style={{ backgroundColor: variant.color || "#FFFFFF" }}
                onClick={() => {
                  setSelectedVariant(variant);
                  setQuantity(1);
                }}
              >
                {selectedVariant?._id === variant._id && (
                  <div className="absolute w-10 h-10 rounded-full ring-2 ring-offset-2 ring-black" />
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 bg-gray-100 rounded-lg px-4 py-2">
          <button
            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handleQuantity("d")}
            disabled={quantity === 1}
          >
            -
          </button>

          <span className="min-w-[2rem] text-center">
            {quantity}
          </span>

          <button
            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handleQuantity("i")}
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>

        {hasVariants && stock > 0 && (
          <div className="text-sm">
            {stock <= 10 ? `Only ${stock} items left!` : `${stock} available`}
          </div>
        )}
        {hasVariants && stock === 0 && (
          <div className="text-sm text-red-500">Out of stock</div>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={stock === 0 && hasVariants}
        className="w-36 text-sm rounded-3xl ring-1 ring-importantcolor text-importantcolor py-2 px-4 hover:bg-importantcolor hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Add;
