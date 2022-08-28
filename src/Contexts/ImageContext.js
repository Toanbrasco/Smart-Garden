import React, { createContext, useReducer } from "react";
// import Data from '../assets/Data/test.json'
import { imageReducer } from './Reducers/ImageReducer'
import { SET_USER } from './Reducers/type'
import { UrlApi, SESSION_STORAGE_TOKEN_NAME } from '../Constants'
import { GET_ORDER, GET_ORDER_FAIL, ORDER_MESSAGE, ADD_ORDER_FAIL } from './Reducers/type'
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";


export const ImageContext = createContext()
const ImageContextProvider = ({ children }) => {
    // const [users, setusers] = useState(Data)
    const [image, imageDispatch] = useReducer(imageReducer, {
        loading: true,
        data: []
    })
    const getImage = async () => {
        try {
            const response = await axios.get(`${UrlApi}/image`)
            if (response.data.success) {
                imageDispatch({ type: GET_ORDER, payload: response.data })
            }
        } catch (error) {
            imageDispatch({ type: GET_ORDER_FAIL })
        }
    }
    const addImage = async (image) => {
        try {
            const response = await axios.post(`${UrlApi}/image`, image)
            console.log(`=> response add image`, response.data)
            return response.data
        } catch (error) {
            // imageDispatch({ type: GET_ORDER_FAIL })
            return error
        }
    }

    const updateImage = async (data) => {
        console.log(`=> data`, [...data])
        try {
            const response = await axios.post(`${UrlApi}/image/update`, data)
            console.log(`=> response update image`, response.data)
            return response.data
        } catch (error) {
            // imageDispatch({ type: GET_ORDER_FAIL })
            return error
        }
    }

    const deleteImage = async (images) => {
        console.log(`=> images`, images)
        try {
            const response = await axios.post(`${UrlApi}/image/delete`, { images: images })
            console.log(`=> response delete image`, response.data)
            return response.data
        } catch (error) {
            imageDispatch({ type: GET_ORDER_FAIL })
        }
    }



    const ImageContextData = {
        image,
        getImage,
        addImage,
        updateImage,
        deleteImage,
        imageDispatch
    }

    return (
        <ImageContext.Provider value={ImageContextData}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider