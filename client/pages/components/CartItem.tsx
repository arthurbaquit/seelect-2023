import classes from "../../styles/CartItem.module.scss";
import { SelectedMeals } from "../index";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

interface CartItemProps {
  items: SelectedMeals;
}

const CartItem = (props: CartItemProps) => {
  const price = `R$${(props.items.price / 100).toFixed(2)}`;
  const ctx = useContext(CartContext);
  const onAdd = () => {
    const addedItem = { ...props.items, amount: 1 };
    ctx.onChangeHandler(addedItem);
  };
  const onRemove = () => {
    const removedItem = { ...props.items, amount: -1 };
    ctx.onChangeHandler(removedItem);
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.items.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.items.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
