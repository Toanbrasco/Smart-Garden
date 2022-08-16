import { ADD_PRODUCT, DELETE_PRODUCT, PRODUCT_FILTER_CATEGORY, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_DETAIL, PRODUCT_SEARCH, PRODUCT_LOADED_ALL } from './type'
import { convertViToEn } from '../../Constants'

export const productReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_LOADED_ALL:
            return {
                ...state,
                loading: false,
                data: payload.data
            }
        case PRODUCT_LOADED_SUCCESS:
            // console.log(PRODUCT_LOADED_SUCCESS)
            return {
                ...state,
                loading: false,
                data: payload.data,
                pagination: payload.pagination
            }
        case PRODUCT_LOADED_FAIL:
            // console.log(PRODUCT_LOADED_FAIL)
            return {
                ...state,
                loading: true,
                error: payload
            }
        case PRODUCT_DETAIL:
            // console.log(PRODUCT_DETAIL)
            return {
                ...state,
                loading: false,
                data: payload.data
            }
        case PRODUCT_FILTER_CATEGORY:
            return {
                ...state,
                loading: false,
                pagination: payload.pagination,
                data: payload.data
            }

        case PRODUCT_SEARCH:
            return {
                ...state,
                loading: false,
                pagination: payload.pagination,
                data: payload.data
            }

        case ADD_PRODUCT:
            return [...state, payload.product]

        case DELETE_PRODUCT:
            return state.filter(product => product.id !== payload.id)

        default:
            console.log('Default')
            return
    }
}
