import React, { useContext } from "react";
import style from "../../styles/MealItem.module.scss";
import { MealItemForm } from "../UI/MealItemForm";
import { CartContext } from "../../store/cart-context";

interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const MealItem = (props: MealItemProps) => {
  const ctx = useContext(CartContext);
  const onSubmitHandler = (amount: number) => {
    ctx.onChangeHandler({ ...props, amount: amount });
  };
  return (
    <li className={style.meal} key={props.id}>
      <div>
        <h3> {props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>${(props.price / 100).toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onSubmitHandler={onSubmitHandler} />
      </div>
    </li>
  );
};
