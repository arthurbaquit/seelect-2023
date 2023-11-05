import React from "react";
import styles from "../../styles/Header.module.scss";
import { HeaderCartButton } from "../UI/HeaderCartButton";
import Image from "next/image";

export const Header = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <>
      <div className={styles.header}>
        <h1>Seelect 2023</h1>
        <HeaderCartButton title={"Seu carrinho"} onClick={onClickHandler} />
      </div>
      <div className={styles["main-image"]}>
        <img src={"/meals.jpg"} alt={"meals"} />
      </div>
    </>
  );
};
