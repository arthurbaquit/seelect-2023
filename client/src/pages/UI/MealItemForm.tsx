import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../styles/MealItemForm.module.scss";
import { Input } from "./Input";

export const MealItemForm = ({
  onSubmitHandler,
}: {
  onSubmitHandler: (amount: number) => void;
}) => {
  const [itemQtd, setItemQtd] = useState<number>(0);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    itemQtd ? onSubmitHandler(itemQtd) : null;
  };
  const onItemQntdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) setItemQtd(+event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        label={"Amount"}
        id={"key"}
        type={"number"}
        onChange={onItemQntdHandler}
        value={itemQtd}
      />
      <button type={"submit"}> +Adicionar</button>
    </form>
  );
};
