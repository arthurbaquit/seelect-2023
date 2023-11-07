import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/HeaderCartButton.module.scss";
import CartIcon from "./CartIcon";
import { CartContext } from "../../store/cart-context";

interface HeaderCartProps {
  title: string;
  onClick: () => void;
}

export const HeaderCartButton = (props: HeaderCartProps) => {
  const ctx = useContext(CartContext);
  const [cartItemsQtd, setCartItemsQtdAmount] = useState<number>(0);
  useEffect(() => {
    ctx.cartItems
      ? setCartItemsQtdAmount(
          ctx.cartItems
            .map((item) => item.amount)
            .reduce((sum: number, current) => sum + current, 0)
        )
      : setCartItemsQtdAmount(0);
  }, [ctx.cartItems]);
  return (
    <div className={styles.bump}>
      <button className={styles.button} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        {props.title}
        <span className={styles.badge}> {cartItemsQtd} </span>
      </button>
    </div>
  );
};
