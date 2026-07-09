import { createContext, useContext, useState, useEffect } from "react";
import initialProducts from "../data/products.json";

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("etoko_products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("etoko_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("etoko_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("etoko_cart", JSON.stringify(cart));
  }, [cart]);

  /* ---------- product CRUD ---------- */
  const addProduct = (prod) =>
    setProducts((prev) => [
      ...prev,
      { ...prod, id: Math.max(...prev.map((p) => p.id), 0) + 1 },
    ]);

  const updateProduct = (id, updated) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  /* ---------- cart ---------- */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}