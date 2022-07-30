import React, { useState, useReducer, createContext } from "react";
// import Data from '../assets/Data/test.json'

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    // const [Carts, setCarts] = useState([])
    const [Carts, cartDispart] = useReducer(cartReducer, [])

    const CartContextData = {
        Carts,
        cartDispart
    }

    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider