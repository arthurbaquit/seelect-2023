import React from "react";
import styles from "../../styles/Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClickHandler: () => void;
}

export const Modal = (props: ModalProps) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClickHandler} />
      <div className={styles.modal}>{props.children}</div>
    </>
  );
};
