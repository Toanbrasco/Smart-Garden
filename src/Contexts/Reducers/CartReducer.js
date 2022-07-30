import { ADD_CART, DELETE_CART, GET_CARTS, SAVE_CARTS } from './types'

export const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_CARTS:
            console.log('getting carts')
            const carts = localStorage.getItem('carts')
            if (carts) state = JSON.parse(carts)
            return state

        case SAVE_CARTS:
            console.log('saving carts')
            localStorage.setItem('carts', JSON.stringify(payload.carts))
            return state

        case ADD_CART:
            return [...state, payload.cart]

        case DELETE_CART:
            return state.filter(cart => cart.id !== payload.id)

        default:
            return state
    }
}
