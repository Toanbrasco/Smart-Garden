import { ADD_CART, DELETE_CART, GET_CARTS, SAVE_CARTS } from './type'

export const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_CARTS:
            console.log(GET_CARTS)
            // const cart = localStorage.getItem('cart')
            if (payload) {
                return {
                    ...state,
                    loading: false,
                    data: payload.data
                }
            }
            return {
                ...state,
                loading: true,
                data: []
            }

        // case SAVE_CARTS:
        //     console.log('saving carts')
        //     localStorage.setItem('carts', JSON.stringify(payload.carts))
        //     return state

        case ADD_CART:
            console.log(ADD_CART)
            return {
                ...state,
                data: [...state.data, payload]
            }

        // return [...state, payload.cart]

        case DELETE_CART:
            return state.filter(cart => cart.id !== payload.id)

        default:
            return state
    }
}
