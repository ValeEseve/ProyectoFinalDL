import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // FIX: Inicializar desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('printsy_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // FIX: Guardar en localStorage cada vez que cambie el cart
  useEffect(() => {
    try {
      localStorage.setItem('printsy_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (print) => {
    console.log('addToCart called with print:', print);
    
    setCart(prevCart => {
      // Verificar que el print tenga un ID válido
      if (!print.id) {
        console.error('Print without ID:', print);
        return prevCart;
      }

      const existingItem = prevCart.find(item => item.id === print.id);
      
      if (existingItem) {
        console.log('Print already in cart, increasing quantity');
        return prevCart.map(item =>
          item.id === print.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log('Adding new print to cart');
        return [...prevCart, { ...print, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    console.log('Removing from cart, ID:', id);
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    console.log('Updating quantity, ID:', id, 'Quantity:', quantity);
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const increaseQuantity = (id) => {
    console.log('Increasing quantity, ID:', id);
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    console.log('Decreasing quantity, ID:', id);
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === id);
      if (item && item.quantity === 1) {
        return prevCart.filter(item => item.id !== id);
      }
      return prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
    localStorage.removeItem('printsy_cart');
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (id) => {
    const result = cart.some(item => Number(item.id) === Number(id));
    console.log(`isInCart check - ID: ${id}, Result: ${result}, Cart:`, cart.map(i => i.id));
    return result;
  };

  const getItemQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const getOrderItemsPayload = () => {
    return cart.map(item => ({
      print_id: item.id,
      quantity: item.quantity
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotal,
        getTotalItems,
        isInCart,
        getItemQuantity,
        getOrderItemsPayload
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;