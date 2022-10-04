import { createContext, useState, useEffect, useReducer } from "react";

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

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  //check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return clearCartItem(cartItems, cartItemToRemove);
  }

  //return back cartItems with matching cart items with reduced quantity
  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_OPEN: "SET_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error("Invalid action");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartCount, cartTotal, cartItems } = state;

  const updateCartItemsReducer = (newCartItems) => {
    // generating newCartCount and newCartTotal
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    //dispatch action with appropriate payload
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: payload });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_OPEN, payload: bool });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemFromCart,
    clearItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
