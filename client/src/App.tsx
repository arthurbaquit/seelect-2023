import MealsSummary from "./pages/components/MealsSummary";
import { Header } from "./pages/components/Header";

import { useState } from "react";
import { Cart } from "./pages/components/Cart";
import { AvailableMeals } from "./pages/components/AvailableMeals";

export type SelectedMeals = {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
};
const Home = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const onClickModalHandler = () => setShowCart(false);
  const onClickHeaderCartButtonHandler = () => setShowCart(true);
  const [test, setTest] = useState<number>(0);
  console.log(test);

  return (
    <>
      {showCart && <Cart onClickHandler={onClickModalHandler} />}
      <Header onClickHandler={onClickHeaderCartButtonHandler} />
      <MealsSummary />
      <AvailableMeals />
      <button
        onClick={() => {
          //0
          setTest((prev) => prev + 1);
          setTest((prev) => prev + 1);
          //2
        }}
      >
        Me aperte
      </button>
    </>
  );
};

export default Home;
