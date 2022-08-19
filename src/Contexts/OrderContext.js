import React, { createContext, useReducer } from "react";
// import Data from '../assets/Data/test.json'
import { orderReducer } from './Reducers/OrderReducer'
import { SET_USER } from './Reducers/type'
import { UrlApi, SESSION_STORAGE_TOKEN_NAME } from '../Constants'
import { GET_ORDER, GET_ORDER_FAIL } from './Reducers/type'
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";


export const OrderContext = createContext()
const OrderContextProvider = ({ children }) => {
    // const [users, setusers] = useState(Data)
    const [order, orderDispatch] = useReducer(orderReducer, {
        loading: true,
        data: []
    })
    const getOrder = async () => {
        try {
            const response = await axios.get(`${UrlApi}/api/order`)
            if (response.data.success) {
                orderDispatch({ type: GET_ORDER, payload: response.data })
            }
        } catch (error) {
            orderDispatch({ type: GET_ORDER_FAIL })
        }
    }


    const OrderContextData = {
        order,
        getOrder,
        orderDispatch
    }

    return (
        <OrderContext.Provider value={OrderContextData}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider