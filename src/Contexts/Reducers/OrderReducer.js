import { GET_ORDER_FAIL, GET_ORDER,  ADD_ORDER_FAIL, ORDER_MESSAGE } from './type'
import { convertViToEn } from '../../Constants'

export const orderReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_ORDER:
            return {
                ...state,
                loading: false,
                data: payload.data
            }

        case GET_ORDER_FAIL:
            return {
                ...state,
                loading: true,
                error: payload
            }

        case ORDER_MESSAGE:
            return {
                ...state,
                message: payload.message,
                success: payload.success
            }
        case ADD_ORDER_FAIL:
            return {
                ...state,
                message: payload.message,
                success: payload.success
            }

        default:
            console.log('Default')
            return
    }
}
