import React, { createContext, useReducer } from "react";
import Data from '../assets/Data/test.json'
import { productReducer } from './Reducers/ProductReducer'
import { PRODUCT_FILTER_CATEGORY, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_DETAIL, PRODUCT_SORT, PRODUCT_SEARCH } from './Reducers/type'


export const ProductContext = createContext()
const ProductContextProvider = ({ children }) => {
    // const [products, setProducts] = useState(Data)
    const [products, productDispatch] = useReducer(productReducer, {
        loading: true,
        data: [],
        error: null
    })

    const getProducts = () => {
        try {
            productDispatch({ type: PRODUCT_LOADED_SUCCESS, payload: Data })
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL })
        }
    }

    const getProductDetail = (name) => {
        getProducts()
        productDispatch({ type: PRODUCT_DETAIL, payload: name })
    }

    const handleCategory = (category) => {
        getProducts()
        productDispatch({ type: PRODUCT_FILTER_CATEGORY, payload: category })
    }

    const handleSelect = (select) => {
        productDispatch({ type: PRODUCT_SORT, payload: select })

    }
    const productSearch = (SearchText) => {
        getProducts()
        productDispatch({ type: PRODUCT_SEARCH, payload: SearchText })
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