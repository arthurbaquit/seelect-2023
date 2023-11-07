import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Cart.module.scss";
import { Modal } from "../UI/Modal";
import CartItem from "./CartItem";
import { CartContext } from "../../store/cart-context";

export const Cart = ({ onClickHandler }: { onClickHandler: () => void }) => {
  const cart = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  console.log(totalAmount);
  useEffect(() => {
    const totalAmountAux = cart.cartItems.map(
      (item) => +(item.amount * item.price).toFixed(2)
    );
    setTotalAmount(
      +totalAmountAux
        .reduce((previous, currenty) => currenty + previous, 0)
        .toFixed(2)
    );
  }, [cart.cartItems]);

  return (
    <Modal onClickHandler={onClickHandler}>
      <ul className={styles["cart-items"]}>
        {cart.cartItems.map((item) => {
          return <CartItem key={item.id} items={item} />;
        })}
      </ul>
      <div className={styles.total}>
        <span> Valor Total </span>
        <span>R${(totalAmount / 100).toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={onClickHandler}>
          Fechar
        </button>
        <button
          type={"button"}
          className={styles.button}
          onClick={() => console.log("Implementar pedido")}
        >
          Pedir
        </button>
      </div>
    </Modal>
  );
};
