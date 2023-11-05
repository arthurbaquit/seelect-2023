import React, {useEffect, useState} from 'react';
import {SelectedMeals} from "../pages";
import cartItem from "../pages/components/CartItem";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

interface CartContextProps {
    children: React.ReactNode
}

type CartContextType = {
    onChangeHandler: (selectMeal: SelectedMeals) => void,
    cartItems: SelectedMeals[]
}
export const CartContext = React.createContext<CartContextType>({
        onChangeHandler: (selectMeal: SelectedMeals) => {
        },
        cartItems: []
    }
)

export const CartContextProvider = (props: CartContextProps) => {
    const [cartItems, setCartItems] = useState<SelectedMeals[]>([])
    const onChangeHandler = (selectMeal: SelectedMeals) => {
        const filteredCartItems = cartItems.filter((cartItem) => cartItem.id === selectMeal.id ? cartItem : null)
        if (filteredCartItems.length) {
            const existingSelectedItem = cartItems.map((cartItem) => {
                if (cartItem.id === selectMeal.id) {
                    const improveSelectedMealAmount = {...cartItem, amount: selectMeal.amount + cartItem.amount}
                    return improveSelectedMealAmount.amount ? improveSelectedMealAmount : null
                }
                return cartItem
            }).filter((item) => item !== null)

            // @ts-ignore
            setCartItems(existingSelectedItem.length ? existingSelectedItem : [])
            localStorage.setItem('cart', JSON.stringify(existingSelectedItem.length ? existingSelectedItem : []))

            return;
        }
        localStorage.setItem('cart', JSON.stringify([...cartItems, selectMeal]))
        setCartItems((state) => [...state, selectMeal])
    }

    useEffect(
        () => {
            let cartItems = localStorage.getItem('cart')
            if (cartItems) {
                cartItems = JSON.parse(cartItems)
                // @ts-ignore
                setCartItems(cartItems)
            }
        }, []
    )

    return <CartContext.Provider
        value={{onChangeHandler: onChangeHandler, cartItems: cartItems}}> {props.children} </CartContext.Provider>
}
