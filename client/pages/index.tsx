import type {NextPage} from 'next'
import MealsSummary from "./components/MealsSummary";
import {Header} from "./components/Header";

import {useState} from "react";
import {Cart} from "./components/Cart";
import {AvailableMeals} from "./components/AvailableMeals";

export type SelectedMeals = {
    id: string,
    name: string,
    description: string,
    price: number,
    amount: number,
}
const Home: NextPage = () => {
    const [showCart, setShowCart] = useState<boolean>(false)
    const onClickModalHandler = () => setShowCart(false)

    const onClickHeaderCartButtonHandler = () => setShowCart(true)

    return (
        <>
            {showCart && <Cart onClickHandler={onClickModalHandler}/>}
            <Header onClickHandler={onClickHeaderCartButtonHandler}/>
            <MealsSummary/>
            <AvailableMeals/>

        </>
    )
}

export default Home
