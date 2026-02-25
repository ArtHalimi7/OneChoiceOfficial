import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

// Key for localStorage persistence
const STORAGE_KEY = 'onechoice_cart';

const loadCart = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(loadCart);

    // Persist to localStorage on every change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item — if same id+size exists, increment quantity
    const addToCart = useCallback((item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id && i.size === item.size);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id && i.size === item.size
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                );
            }
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
    }, []);

    // Remove item by id + size
    const removeFromCart = useCallback((id, size) => {
        setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
    }, []);

    // Update quantity by delta (+1 / -1), minimum 1
    const updateQuantity = useCallback((id, size, delta) => {
        setCartItems(prev =>
            prev.map(i =>
                i.id === id && i.size === size
                    ? { ...i, quantity: Math.max(1, i.quantity + delta) }
                    : i
            )
        );
    }, []);

    // Clear entire cart (after order confirmation)
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Derived values
    const cartCount = useMemo(
        () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
        [cartItems]
    );

    const subtotal = useMemo(
        () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [cartItems]
    );

    const shipping = useMemo(() => (subtotal > 200 ? 0 : 10), [subtotal]);
    const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        total,
    }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, shipping, total]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for consuming the cart
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
