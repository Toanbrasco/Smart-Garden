import { GET_ORDER_FAIL, GET_ORDER } from './type'
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

        default:
            console.log('Default')
            return
    }
}
