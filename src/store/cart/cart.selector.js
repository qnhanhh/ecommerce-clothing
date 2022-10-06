import { createSelector } from "reselect";

const selectCartReducer = state => state.cart

const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const cartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )
)

export const cartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    )
)