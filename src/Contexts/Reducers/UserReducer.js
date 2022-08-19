import { SET_USER, USER_LOGOUT, SET_USER_FAIL, USER_GET, USER_FAIL, USER_REGISTER, USER_DELETE } from './type'
// import { convertViToEn } from '../../Constants'

export const userReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user.name
            }

        case SET_USER_FAIL:
            return state

        case USER_FAIL:
            console.log(`=> USER_FAIL`, payload)
            return {
                ...state,
                message: payload.message,
                success: payload.success
            }

        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case USER_REGISTER:
            return {
                ...state,
                message: payload.message
            }

        case USER_GET:
            return {
                ...state,
                authLoading: false,
                data: payload.user
            }
        case USER_DELETE:
            return {
                ...state,
                deleteUser: payload.user,
                message: payload.message
            }

        default:
            return
    }

}
