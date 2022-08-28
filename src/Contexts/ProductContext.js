import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// import Data from '../assets/Data/test.json'
import { productReducer } from './Reducers/ProductReducer'
import {
    PRODUCT_FILTER_CATEGORY, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_DETAIL,
    PRODUCT_LOADED_ALL, PRODUCT_SEARCH, PRODUCT_REFESH, ADD_PRODUCT, ADD_PRODUCT_FAIL
} from './Reducers/type'
import { UrlApi, convertViToEn } from "../Constants";


export const ProductContext = createContext()
const ProductContextProvider = ({ children }) => {
    const [products, productDispatch] = useReducer(productReducer, {
        loading: true,
        loadingDetail: true,
        data: [],
        pagination: {},
        error: null
    })
    // loading2: true,
    // console.log(`=> products Context`, products)
    const getProductsAll = async () => {
        refeshProduct()
        try {
            const response = await axios.get(`${UrlApi}/api/products/all`)
            if (response.data.success) {
                productDispatch({ type: PRODUCT_LOADED_ALL, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }
    const getProducts = async (page, limit, sort) => {
        console.log('Get Products')
        refeshProduct()
        // console.log(`=> getProducts`, page,'|', limit,'|', sort)
        // console.log('Get Products')
        try {
            const response = await axios.get(`${UrlApi}/api/products?page=${page}&limit=${limit}&sort=${sort}`)
            if (response.data.success) {
                productDispatch({ type: PRODUCT_LOADED_SUCCESS, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }
    const getProductsHome = async () => {
        refeshProduct()
        const random = 4
        try {
            const response = await axios.get(`${UrlApi}/api/products/random?random=${random}`)
            if (response.data.success) {
                productDispatch({ type: PRODUCT_LOADED_SUCCESS, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }

    const getProductDetail = async (productName) => {
        refeshProduct()
        console.log('Get Products Detail', productName)
        try {
            const response = await axios.get(`${UrlApi}/api/products/detail?detail=${productName}`)
            console.log(`=> products Detail`, products)
            if (response.data.success) {
                productDispatch({ type: PRODUCT_DETAIL, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }

    const handleCategory = async (category, page, limit, sort) => {
        refeshProduct()
        // console.log('Get Products Category')
        // console.log(`=> category, page, limit`, category, page, limit, sort)
        try {
            const response = await axios.get(`${UrlApi}/api/products/category?page=${page}&limit=${limit}&sort=${sort}&category=${category}`)
            // console.log(`=> products handleCategory`, products.data)
            if (response.data.success) {
                productDispatch({ type: PRODUCT_FILTER_CATEGORY, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }

    const productSearch = async (searchText, page, limit, sort) => {
        refeshProduct()
        // console.log('productSearch', page, "|", limit)
        try {
            const response = await axios.get(`${UrlApi}/api/products/search?page=${page}&limit=${limit}&sort=${sort}&searchtext=${searchText}`)
            if (response.data.success) {
                productDispatch({ type: PRODUCT_SEARCH, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }

    const addProduct = async newProduct => {
        console.log(`=> newProduct`, newProduct)
        try {
            const response = await axios.post(`${UrlApi}/api/products`, newProduct)
            return response.data
            // if (response.data.success) {
            //     productDispatch({ type: ADD_PRODUCT, payload: response.data })
            // } else {
            //     productDispatch({ type: ADD_PRODUCT, payload: response.data })
            // }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }
    const updateProduct = async ProductUpdate => {
        try {
            const response = await axios.put(`${UrlApi}/api/products`, ProductUpdate)
            return response.data
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${UrlApi}/api/products/${id}`,)
            return response.data
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }

    const refeshProduct = () => {
        // console.log('refeshProduct')
        productDispatch({ type: PRODUCT_REFESH })
    }
    const ProductContextData = {
        products,
        getProducts,
        getProductDetail,
        handleCategory,
        productSearch,
        getProductsAll,
        getProductsHome,
        refeshProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        productDispatch
    }

    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider