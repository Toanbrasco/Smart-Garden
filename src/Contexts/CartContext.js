import React, { useState, useReducer, createContext, useEffect } from "react";
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
        // console.log('Get Cart')
        const Carts = await localStorage.getItem('cart')
        cartDispart({ type: GET_CARTS, payload: JSON.parse(Carts) })
    }

    const addToCart = (id) => {
        // console.log('addToCart')
        if (cart.data.length === 0) {
            // console.log('Add Cart First')
            const newItem = { _id: id, count: 1 }
            cartDispart({ type: ADD_CART, payload: newItem })
        } else {
            // console.log('Add Cart Count')
            let repeat = false;
            for (let i = 0; i < cart.data.length; i++) {
                // console.log("Cart_i", cart.data[i]._id.$oid, "||", id.$oid, '||', cart.data[i]._id.$oid === id.$oid)
                if (JSON.stringify(cart.data[i]._id) === JSON.stringify(id)) {
                    repeat = true;
                    cart.data[i].count += 1
                    // cartDispart({ type: ADD_CART, payload: cart })
                }
            }
            if (!repeat) {
                // console.log('Add CartNot dup')
                const newItem = { _id: id, count: 1 }
                // cartState.push(newItem)
                cartDispart({ type: ADD_CART, payload: newItem })
                // return [...state, newItem]
            }
        }
        cartDispart({ type: SAVE_CARTS, payload: cart.data })
        // localStorage.setItem('cart', JSON.stringify(cart.data))
        // cartDispart({ type: ADD_CART, payload: id })
    }
    const handleCount = (id, num) => {
        switch (num) {
            case 0:
                for (let i = 0; i < cart.data.length; i++) {
                    if (JSON.stringify(cart.data[i]._id) === JSON.stringify(id)) {
                        cart.data[i].count += 1
                        cartDispart({ type: SAVE_CARTS, payload: cart.data })
                    }
                }
                break;
            case 1:
                for (let i = 0; i < cart.data.length; i++) {
                    if (JSON.stringify(cart.data[i]._id) === JSON.stringify(id)) {
                        if (cart.data[i].count === 1) {
                            cartDispart({ type: DELETE_CART, payload: cart.data[i]._id })
                        } else {
                            cart.data[i].count -= 1
                        }
                        cartDispart({ type: SAVE_CARTS, payload: cart.data })
                    }
                }
                break;

            default:
                break;
        }
        setTimeout(() => { getCart() }, 100)
    }

    const removeCartItem = (id) => {
        cartDispart({ type: DELETE_CART, payload: id })
        // console.log('Before SAVE', cart.data)
        // setTimeout(() => { cartDispart({ type: SAVE_CARTS, payload: cart.data }) }, 500)
    }

    useEffect(() => {
        cartDispart({ type: SAVE_CARTS, payload: cart.data })
    }, [cart.data])


    const CartContextData = {
        cart,
        getCart,
        addToCart,
        removeCartItem,
        handleCount,
        cartDispart
    }

    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider