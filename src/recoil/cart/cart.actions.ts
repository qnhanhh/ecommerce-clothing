import { CartItem } from "./cart.state";
import { CategoryItem } from "../categories/categories.state";

export const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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
    return [...cartItems, { ...productToAdd, quantity: 1 }]
};

export const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return clearCartItem(cartItems, cartItemToRemove);
    }

    //return back cartItems with matching cart items with reduced quantity
    const newCartItems = cartItems.map((item) =>
        item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );

    return newCartItems
};

export const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
    const newCartItems = cartItems.filter((item) => item.id !== cartItemToClear.id);

    return newCartItems
};