import React, { createContext, useReducer } from "react";
import Data from '../assets/Data/test.json'
import { productReducer } from './Reducers/ProductReducer'
import { PRODUCT_FILTER_CATEGORY, PRODUCT_LOADED_SUCCESS, PRODUCT_LOADED_FAIL, PRODUCT_DETAIL, PRODUCT_SORT } from './Reducers/type'


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
        dispatch({ type: PRODUCT_DETAIL, payload: name })
    }

    const handleCategory = (category) => {
        getProducts()
        dispatch({ type: PRODUCT_FILTER_CATEGORY, payload: category })
    }

    const handleSelect = (select) => {
        dispatch({ type: PRODUCT_SORT, payload: select })

    }

    const ProductContextData = {
        products,
        getProducts,
        getProductDetail,
        handleCategory,
        handleSelect,
        dispatch
    }

    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider