import React from "react";
import styles from "../../styles/Card.module.scss";

interface CardProps {
  children: React.ReactNode;
}
export const Card = (props: CardProps) => {
  return <div className={styles.card}>{props.children}</div>;
};
