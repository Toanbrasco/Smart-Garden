import React, { useState, createContext, useReducer, useEffect } from "react";
import Data from '../assets/Data/test.json'
import { productReducer } from './Reducers/ProductReducer'
import { ADD_PRODUCT, DELETE_PRODUCT, FIND_PRODUCT, UPDATE_PRODUCT, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_FILTER } from './Reducers/type'


export const ProductContext = createContext()
const ProductContextProvider = ({ children }) => {
    // const [products, setProducts] = useState(Data)
    const [products, dispatch] = useReducer(productReducer, {
        loading: true,
        data: [],
        error: null
    })
    const getProducts = () => {
        try {
            dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: Data })
        } catch (error) {
            dispatch({ type: PRODUCT_LOADED_FAIL })
        }
    }
    const getProductDetail = (name) => {
        getProducts()
        dispatch({ type: PRODUCT_FILTER, payload: name })
    }
    // useEffect(() => {
    //     console.log('useEffect Get')
    //     dispatch({
    //         type: GET_PRODUCTS,
    //         payload: Data
    //     })
    // }, [])
    const ProductContextData = {
        products,
        getProducts,
        getProductDetail,
        dispatch
    }

    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider