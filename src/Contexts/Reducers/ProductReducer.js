import { ADD_PRODUCT, DELETE_PRODUCT, PRODUCT_FILTER_CATEGORY, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_DETAIL, PRODUCT_SORT } from './type'
import { convertViToEn } from '../../Constants'

export const productReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_LOADED_SUCCESS:
            // console.log(PRODUCT_LOADED_SUCCESS)
            return {
                ...state,
                loading: false,
                data: payload
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
                data: state.data.filter((item) => { return convertViToEn(item.name) === payload })
            }
        case PRODUCT_SORT:
            // console.log(PRODUCT_SORT)
            if (payload === '0') {
                return {
                    ...state,
                    loading: false
                }
            }
            if (payload === '1') {
                return {
                    ...state,
                    data: state.data.sort((a, b) => Number(a.price.base) - Number(b.price.base)),
                    loading: false
                }
            }
            if (payload === '2') {
                return {
                    ...state,
                    data: state.data.sort((a, b) => Number(b.price.base) - Number(a.price.base)),
                    loading: false
                }
            }
        case PRODUCT_FILTER_CATEGORY:
            let newFill = []
            state.data.forEach((item) => {
                if (item.category.detail.includes(payload) || item.category.main.includes(payload)) {
                    newFill.push(item)
                }
            });
            return {
                ...state,
                data: newFill,
                loading: false
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
