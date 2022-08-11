import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// import Data from '../assets/Data/test.json'
import { productReducer } from './Reducers/ProductReducer'
import { PRODUCT_FILTER_CATEGORY, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_DETAIL, PRODUCT_SORT, PRODUCT_SEARCH } from './Reducers/type'
import { UrlApi, convertViToEn } from "../Constants";


export const ProductContext = createContext()
const ProductContextProvider = ({ children }) => {
    // const [products, setProducts] = useState(Data)
    const [products, productDispatch] = useReducer(productReducer, {
        loading: true,
        data: [],
        pagination: {},
        error: null
    })
    const getProducts = async (page, limit) => {
        // console.log(`page ${page} - limit ${limit}`)
        try {
            const products = await axios.get(`${UrlApi}/api/products?page=${page}&limit=${limit}`)
            console.log(`=> products getProducts`, products.data)
            if (products.data.success) {
                productDispatch({ type: PRODUCT_LOADED_SUCCESS, payload: products.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL })
        }
    }

    const getProductDetail = async (productName) => {
        try {
            const products = await axios.get(`${UrlApi}/api/products/detail?detail=${productName}`)
            // console.log(`=> products api`, products.data.data)
            if (products.data.success) {
                productDispatch({ type: PRODUCT_DETAIL, payload: products.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL })
        }
        // productDispatch({ type: PRODUCT_DETAIL, payload: productName })
    }
    const handleCategory = async (category, page, limit) => {
        // console.log(`=> category, page, limit`, category, page, limit)
        // /api/products/category?category=
        try {
            const products = await axios.get(`${UrlApi}/api/products/category?page=${page}&limit=${limit}&category=${category}`)
            console.log(`=> products handleCategory`, products.data)
            if (products.data.success) {
                productDispatch({ type: PRODUCT_FILTER_CATEGORY, payload: products.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL })
        }
        // productDispatch({ type: PRODUCT_FILTER_CATEGORY, payload: category })
    }

    const handleSelect = (select) => {
        productDispatch({ type: PRODUCT_SORT, payload: select })

    }
    const productSearch = async (searchText, page, limit) => {
        console.log('productSearch', page, "|", limit)
        try {
            const products = await axios.get(`${UrlApi}/api/products/search?page=${page}&limit=${limit}&searchtext=${searchText}`)
            console.log(`=> products productSearch`, products.data)
            if (products.data.success) {
                productDispatch({ type: PRODUCT_SEARCH, payload: products.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL })
        }
        // getProducts()
        // productDispatch({ type: PRODUCT_SEARCH, payload: SearchText })
    }

    const ProductContextData = {
        products,
        getProducts,
        getProductDetail,
        handleCategory,
        handleSelect,
        productSearch,
        productDispatch
    }

    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider