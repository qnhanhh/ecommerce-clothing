import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

export type SetCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartOpen = withMatcher((bool: boolean): SetCartOpen =>
    createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool))

export const setCartItems=withMatcher((cartItems:CartItem[]):SetCartItems=>createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems)
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems)
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems)
};

export const resetCart = () => {
    const newCartItems: CartItem[] = [];
    return setCartItems(newCartItems)
}

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
        return clearCartItem(cartItems, cartItemToRemove);
    }

    //return back cartItems with matching cart items with reduced quantity
    return cartItems.map((item) =>
        item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
};