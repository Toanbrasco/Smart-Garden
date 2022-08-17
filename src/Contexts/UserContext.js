import React, { createContext, useReducer } from "react";
// import Data from '../assets/Data/test.json'
import { userReducer } from './Reducers/UserReducer'
import { SET_USER } from './Reducers/type'
import { UrlApi, SESSION_STORAGE_TOKEN_NAME } from '../Constants'
import { USER_LOGOUT, SET_USER_FAIL, USER_GET, USER_FAIL, USER_REGISTER, USER_DELETE } from './Reducers/type'
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";


export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    // const [users, setusers] = useState(Data)
    const [user, userDispatch] = useReducer(userReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    // Authenticate user
    const loadUser = async () => {
        if (sessionStorage[SESSION_STORAGE_TOKEN_NAME]) {
            setAuthToken(sessionStorage[SESSION_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${UrlApi}/api/auth`)
            // console.log(`=> response auth`, response.data)
            if (response.data.success) {
                userDispatch({ type: SET_USER, payload: response.data })
            }
        } catch (error) {
            sessionStorage.removeItem(SESSION_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            userDispatch({ type: SET_USER_FAIL })
        }
    }

    // useEffect(() => loadUser(), [])

    // Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${UrlApi}/api/auth/login`, userForm)
            // console.log(`=> response login`, response.data)
            if (response.data.success) {
                sessionStorage.setItem(SESSION_STORAGE_TOKEN_NAME, response.data.accessToken)

                await loadUser()
                // console.log(response.data)
                // return response.data
            } else {
                userDispatch({ type: USER_FAIL, payload: response.data })
            }
        } catch (error) {
            if (error.response.data) { userDispatch({ type: USER_FAIL, payload: error.response.data }) }
            else return { success: false, message: error.message }
        }
    }

    // Register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${UrlApi}/api/auth/register`, userForm)
            if (response.data.success) {
                userDispatch({ type: USER_REGISTER, payload: response.data })
            } else {
                userDispatch({ type: USER_FAIL, payload: response.data })
            }
        } catch (error) {
            if (error.response.data) { userDispatch({ type: USER_FAIL, payload: error.response.data }) }
            else return { success: false, message: error.message }
        }
    }

    // Logout
    const logoutUser = () => {
        sessionStorage.removeItem(SESSION_STORAGE_TOKEN_NAME)
        userDispatch({ type: USER_LOGOUT })
    }
    // Get User
    const getUser = async () => {
        try {
            const response = await axios.get(`${UrlApi}/api/auth/all`)
            // console.log(`=> response all`, response.data)
            if (response.data.success) {
                userDispatch({ type: USER_GET, payload: response.data })
            } else {
                userDispatch({ type: USER_FAIL, payload: response.message })
            }
        } catch (error) {
            if (error.response.data) { userDispatch({ type: USER_FAIL, payload: error.response.data }) }
            else return { success: false, message: error.message }
        }
    }
    // Remove User
    const removeUser = async (_id) => {
        try {
            const response = await axios.delete(`${UrlApi}/api/auth/${_id}`)
            console.log(`=> response remove`, response.data)
            if (response.data.success) {
                userDispatch({ type: USER_DELETE, payload: response.data })
            } else {
                userDispatch({ type: USER_FAIL, payload: response.message })
            }
        } catch (error) {
            if (error.response.data) { userDispatch({ type: USER_FAIL, payload: error.response.data }) }
            else return { success: false, message: error.message }
        }
    }

    const UserContextData = {
        user,
        loginUser,
        registerUser,
        logoutUser,
        getUser,
        loadUser,
        removeUser,
        userDispatch
    }

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider