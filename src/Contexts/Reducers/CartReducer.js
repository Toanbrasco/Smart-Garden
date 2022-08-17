import { ADD_CART, DELETE_CART, GET_CARTS, SAVE_CARTS } from './type'

export const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_CARTS:
            // console.log(GET_CARTS)
            // const cart = localStorage.getItem('cart')
            // console.log(`=> Get cart payload`, payload)
            if (payload) {
                return {
                    ...state,
                    loading: false,
                    data: payload
                }
            } else {
                return {
                    ...state,
                    loading: true,
                    data: []
                }
            }

        case SAVE_CARTS:
            // console.log('Saving Carts', payload)
            sessionStorage.setItem('cart', JSON.stringify(payload))
            return state

        case ADD_CART:
            console.log(ADD_CART)
            return {
                ...state,
                data: [...state.data, payload]
            }

        // return [...state, payload.cart]

        case DELETE_CART:
            return {
                ...state,
                data: state.data.filter(cart => JSON.stringify(cart._id) !== JSON.stringify(payload))
            }

        default:
            return state
    }
}
