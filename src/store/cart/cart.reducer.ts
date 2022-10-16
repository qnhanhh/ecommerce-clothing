import { AnyAction } from 'redux';
import { setCartItems, setCartOpen } from './cart.action';
import { CartItem } from './cart.types'

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (
    state = CART_INITIAL_STATE,
    action : AnyAction
):CartState => {
    if(setCartOpen.match(action)){
        return {...state, isCartOpen:action.payload}
    }

    if(setCartItems.match(action)){
        return {...state, cartItems: action.payload}
    }

    return state
};