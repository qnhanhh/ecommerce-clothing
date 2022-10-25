import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { CategoryItem } from '../categories/categories.state'

const { persistAtom } = recoilPersist({
    key: 'cart-persist',
    storage: localStorage
})

export type CartItem = CategoryItem & {
    quantity: number
}

export type CartState = {
    readonly isCartOpen: boolean
    readonly cartItems: CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
};

export const cartState = atom<CartState>({
    key: 'cart',
    default: CART_INITIAL_STATE,
    effects_UNSTABLE: [persistAtom]
})

export const cartSelector = selector({
    key: 'cartSelector',
    get: ({ get }) => {
        const cart = get(cartState)
        const cartItems = cart.cartItems
        const isCartOpen = cart.isCartOpen
        const cartCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        )
        const cartTotal = cartItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        )

        return { cart, cartItems, isCartOpen, cartCount, cartTotal }
    }
})