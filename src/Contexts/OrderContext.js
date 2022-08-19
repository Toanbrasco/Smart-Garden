import React, { createContext, useReducer } from "react";
// import Data from '../assets/Data/test.json'
import { orderReducer } from './Reducers/OrderReducer'
import { SET_USER } from './Reducers/type'
import { UrlApi, SESSION_STORAGE_TOKEN_NAME } from '../Constants'
import { GET_ORDER, GET_ORDER_FAIL, ORDER_MESSAGE, ADD_ORDER_FAIL } from './Reducers/type'
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
    const addOrder = async (order) => {
        try {
            const response = await axios.post(`${UrlApi}/api/order`, order)
            console.log(`=> response Add order`, response)
            if (response.data.success) {
                orderDispatch({ type: ORDER_MESSAGE, payload: response.data })
            } else {
                orderDispatch({ type: ORDER_MESSAGE, payload: response.data })
            }
        } catch (error) {
            orderDispatch({ type: GET_ORDER_FAIL })
        }
    }

    const deleteOrder = async (_id) => {
        try {
            const response = await axios.delete(`${UrlApi}/api/order/${_id}`)
            console.log(`=> response Add order`, response)
            if (response.data.success) {
                orderDispatch({ type: ORDER_MESSAGE, payload: response.data })
            } else {
                orderDispatch({ type: ORDER_MESSAGE, payload: response.data })
            }
        } catch (error) {
            orderDispatch({ type: GET_ORDER_FAIL })
        }
    }
    const updateStatusOrder = async (_id, status) => {
        try {
            const response = await axios.put(`${UrlApi}/api/order/${_id}`, { status: status })
            if (response.data.success) {
                orderDispatch({ type: ORDER_MESSAGE, payload: response.data })
            } else {
                orderDispatch({ type: ORDER_MESSAGE, payload: response.data })
            }
        } catch (error) {
            orderDispatch({ type: GET_ORDER_FAIL })
        }
    }


    const OrderContextData = {
        order,
        getOrder,
        addOrder,
        deleteOrder,
        updateStatusOrder,
        orderDispatch
    }

    return (
        <OrderContext.Provider value={OrderContextData}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider