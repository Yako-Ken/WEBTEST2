import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;

  subtotal: number;
  delivery: number;
  salesTax: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  increaseQuantity: (productId: string, variantId?: string) => void;
  decreaseQuantity: (productId: string, variantId?: string) => void;
}

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0; // مثال ثابت
  const salesTax = subtotal * 0.1; // 10% مثال
  const totalPrice = subtotal + delivery + salesTax;

  return {
    totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal,
    delivery,
    salesTax,
    totalPrice,
  };
};


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
totalItems: 0,
subtotal: 0,
delivery: 0,
salesTax: 0,
totalPrice: 0,


      addItem: (itemToAdd) => {
        const { items } = get();
        
        const existingItem = items.find(item => 
          itemToAdd.variantId 
            ? item.variantId === itemToAdd.variantId 
            : item.productId === itemToAdd.productId
        );

        let updatedItems: CartItem[];
        if (existingItem) {
          updatedItems = items.map(item =>
            (item.productId === itemToAdd.productId && item.variantId === itemToAdd.variantId)
              ? { ...item, quantity: item.quantity + itemToAdd.quantity }
              : item
          );
        } else {
          updatedItems = [...items, itemToAdd];
        }

        const { totalItems, totalPrice } = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems,
          totalPrice,
        });
      },

      removeItem: (productIdToRemove, variantIdToRemove) => {
        const { items } = get();
        
        const updatedItems = items.filter(item => {
          if (variantIdToRemove) {
            return item.variantId !== variantIdToRemove;
          }
          return item.productId !== productIdToRemove;
        });

        const { totalItems, totalPrice } = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems,
          totalPrice,
        });
      },

      increaseQuantity: (productId, variantId) => {
        const { items } = get();
        const updatedItems = items.map(item =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },

      decreaseQuantity: (productId, variantId) => {
        const { items } = get();
        const updatedItems = items
          .map(item =>
            item.productId === productId && item.variantId === variantId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0); // إزالة العنصر إذا وصل للصفر
        const totals = calculateTotals(updatedItems);
        set({ items: updatedItems, ...totals });
      },
    }),
    { name: 'cart-storage' }
  )
);