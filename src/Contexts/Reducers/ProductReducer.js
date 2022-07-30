import { ADD_PRODUCT, DELETE_PRODUCT, FIND_PRODUCT, UPDATE_PRODUCT, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_FILTER } from './type'
import Prodcuts from '../../assets/Data/test.json'
import { convertViToEn } from '../../Constants'

export const productReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_LOADED_SUCCESS:
            console.log(PRODUCT_LOADED_SUCCESS)
            return {
                ...state,
                loading: false,
                data: payload
            }
        case PRODUCT_LOADED_FAIL:
            console.log(PRODUCT_LOADED_FAIL)
            return {
                ...state,
                loading: true,
                error: payload
            }
        case PRODUCT_FILTER:
            console.log(PRODUCT_FILTER)
            console.log('state', state)
            return {
                ...state,
                loading: false,
                data: state.data.filter((item) => { return convertViToEn(item.name) === payload })
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
