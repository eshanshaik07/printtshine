import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const CART_STORAGE_KEY = "printshine-cart";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  lastAdded: CartItem | null;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.unitPrice) &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter(isCartItem));
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      lastAdded,
      addItem: (item) => {
        setLastAdded(item);
        setItems((current) => {
          const existing = current.find((entry) => entry.id === item.id);
          if (!existing) return [...current, item];
          return current.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + item.quantity, unitPrice: item.unitPrice }
              : entry,
          );
        });
      },
      updateQuantity: (id, quantity) => {
        const nextQuantity = Math.max(1, Math.floor(quantity) || 1);
        setItems((current) =>
          current.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)),
        );
      },
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    }),
    [items, lastAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}