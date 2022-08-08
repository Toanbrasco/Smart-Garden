import React, { createContext, useReducer } from "react";
// import Data from '../assets/Data/test.json'
import { userReducer } from './Reducers/UserReducer'
import { USER_LOGIN } from './Reducers/type'


export const UserContext = createContext()
const UserContextProvider = ({ children }) => {
    // const [users, setusers] = useState(Data)
    const [user, userDispatch] = useReducer(userReducer, {
        loading: true,
        login: false,
        error: null
    })
    const loginUser = () => {
        userDispatch({ type: USER_LOGIN })
    }

    const UserContextData = {
        user,
        loginUser,
        userDispatch
    }

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider