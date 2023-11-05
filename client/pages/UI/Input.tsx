import React, { ChangeEvent } from "react";
import style from "../../styles/Input.module.scss";

interface InputProps {
  label: string;
  id: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: any;
}
export const Input = (props: InputProps) => {
  return (
    <div className={style.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};
