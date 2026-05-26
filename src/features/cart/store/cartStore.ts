import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Cart Store — Zustand with localStorage persistence.
 *
 * Manages the shopping cart state client-side with automatic
 * persistence across page reloads and browser sessions.
 */

export interface CartItemConfig {
  color?: string;
  eyeStyle?: string;
  accessory?: string;
  customName?: string;
}

export interface CartItem {
  id: string; // Unique cart item ID (product + variant combination)
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
  config: CartItemConfig;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed (as functions since Zustand doesn't have computed)
  getItemCount: () => number;
  getSubtotal: () => number;
}

/**
 * Generate a unique cart item ID based on product + customization.
 * Same product with different colors = different cart items.
 */
function generateCartItemId(productId: string, config: CartItemConfig): string {
  const parts = [
    productId,
    config.color || "default",
    config.eyeStyle || "default",
    config.accessory || "none",
    config.customName || "",
  ];
  return parts.join("_");
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = generateCartItemId(item.productId, item.config);

        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === id);

          if (existingIndex >= 0) {
            // Increment quantity if same variant exists
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + item.quantity,
            };
            return { items: updatedItems };
          }

          // Add new item
          return { items: [...state.items, { ...item, id }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cotcret-cart",
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
