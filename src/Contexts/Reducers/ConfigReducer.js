import { CONFIG_GET, CONFIG_FAIL, CONFIG_REFESH } from './type'

export const configReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CONFIG_GET:
            return {
                ...state,
                loading: false,
                data: payload.data[0]
            }
        case CONFIG_REFESH:
            return {
                ...state,
                loading: true,
                data: {}
            }
        case CONFIG_FAIL:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}
