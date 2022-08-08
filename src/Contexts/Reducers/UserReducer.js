import { USER_LOGIN } from './type'
// import { convertViToEn } from '../../Constants'

export const userReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_LOGIN:
            // console.log(PRODUCT_LOADED_SUCCESS)
            return {
                ...state,
                loading: false,
                login: true
            }

        default:
            console.log('Default')
            return
    }
}
