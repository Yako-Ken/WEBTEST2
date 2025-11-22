"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/hooks/useCartStore";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    items,
    subtotal,
    delivery,
    salesTax,
    totalPrice,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
  } = useCartStore();

  if (!mounted || items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Your cart is empty – nothing to checkout.</p>
      </div>
    );

  const goToPayment = () => {
    window.location.href = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!;
  };

  return (
    <div className=" bg-white text-gray-900">
      <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-10">
        <section className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer details</h2>
            <input
              type="email"
              placeholder="Email *"
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name *"
                required
                className="border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Last name *"
                required
                className="border rounded px-4 py-2"
              />
            </div>

            <select
              defaultValue="United States"
              className="w-full border rounded px-4 py-2 mt-4"
            >
              <option>United States</option>
            </select>

            <input
              type="text"
              placeholder="Address *"
              required
              className="w-full border rounded px-4 py-2 mt-4"
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="City *"
                required
                className="border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="State *"
                required
                className="border rounded px-4 py-2"
              />
            </div>

            <input
              type="text"
              placeholder="Zip / Postal code *"
              required
              className="w-full border rounded px-4 py-2 mt-4"
            />
          </div>
        </section>

        <aside className="bg-gray-50 rounded-lg p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Order summary ({items.length})</h3>
            <Link href="/cart" className="text-sm text-blue-600 hover:underline">
              Edit Cart
            </Link>
          </div>

          <div className="flex flex-col gap-4 border-b pb-4">
            {items.map((item) => (
              <div key={item.variantId || item.productId} className="flex gap-4">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <span className="text-sm">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500">available</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.productId, item.variantId)}
                        className="px-2 py-0.5 border rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.productId, item.variantId)}
                        className="px-2 py-0.5 border rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-blue-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm mt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{(delivery || 0) === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>${(salesTax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
              <span>Total</span>
              <span>${(totalPrice || 0).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={goToPayment}
            className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Secure Checkout
          </button>
        </aside>
      </main>
    </div>
  );
}