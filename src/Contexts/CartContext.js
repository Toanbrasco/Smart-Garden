import React, { useState, useReducer, createContext } from "react";
import { ADD_CART, DELETE_CART, GET_CARTS, SAVE_CARTS } from './Reducers/type'
// import Data from '../assets/Data/test.json'
import { cartReducer } from "./Reducers/CartReducer";

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    // const [Carts, setCarts] = useState([])
    const [cart, cartDispart] = useReducer(cartReducer, {
        loading: true,
        data: []
    })

    const getCart = async () => {
        const Carts = await localStorage.getItem('cart')
        cartDispart({ type: GET_CARTS, payload: JSON.parse(Carts) })
    }

    const addToCart = (id) => {
        console.log('addToCart')
        if (cart.data.length === 0) {
            console.log('length === 0')
            const newItem = { _id: id, count: 1 }
            cartDispart({ type: ADD_CART, payload: newItem })
        } else {
            console.log('Count Frist')
            let repeat = false;
            for (let i = 0; i < cart.data.length; i++) {
                // console.log("Cart_i", cart.data[i]._id.$oid, "||", id.$oid, '||', cart.data[i]._id.$oid === id.$oid)
                if (cart.data[i]._id.$oid === id.$oid) {
                    repeat = true;
                    cart.data[i].count += 1
                    // cartDispart({ type: ADD_CART, payload: cart })
                }
            }
            if (!repeat) {
                console.log(ADD_CART, '-Not dup')
                const newItem = { _id: id, count: 1 }
                // cartState.push(newItem)
                cartDispart({ type: ADD_CART, payload: newItem })
                // return [...state, newItem]
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        // cartDispart({ type: ADD_CART, payload: id })
    }

    const CartContextData = {
        cart,
        getCart,
        addToCart,
        cartDispart
    }

    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider