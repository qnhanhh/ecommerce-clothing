import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCartItem) {
    const newCartItems = cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return newCartItems;
  }
  //return new array with modified cartItems/new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
